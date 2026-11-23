import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { toCamelCase } from '../utils/helpers.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT u.UserId, u.FullName, u.Email, u.PasswordHash, u.IsActive,
              GROUP_CONCAT(r.RoleName) AS Roles
       FROM Users u
       LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
       LEFT JOIN Roles r ON ur.RoleId = r.RoleId
       WHERE u.Email = ?
       GROUP BY u.UserId`,
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid email credentials or password.' });
    }

    const user = rows[0];

    if (!user.IsActive) {
      return res.status(401).json({ message: 'Account is inactive.' });
    }

    const valid = await bcrypt.compare(password, user.PasswordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email credentials or password.' });
    }

    const roles = (user.Roles || '').split(',').filter(Boolean);
    if (!roles.includes('Admin')) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    const token = jwt.sign(
      { userId: user.UserId, email: user.Email, roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      user: toCamelCase({
        userId: user.UserId,
        fullName: user.FullName,
        email: user.Email,
        roles,
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed.' });
  }
});

export default router;
