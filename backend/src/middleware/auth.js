import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { toCamelCase } from '../utils/helpers.js';

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export async function requireAdmin(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT u.UserId, u.FullName, u.Email, u.IsActive, GROUP_CONCAT(r.RoleName) AS Roles
       FROM Users u
       LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
       LEFT JOIN Roles r ON ur.RoleId = r.RoleId
       WHERE u.UserId = ? AND u.IsActive = 1
       GROUP BY u.UserId`,
      [req.user.userId]
    );

    if (!rows.length) {
      return res.status(401).json({ message: 'User not found or inactive.' });
    }

    const user = toCamelCase(rows[0]);
    const roles = (user.roles || '').split(',').filter(Boolean);

    if (!roles.includes('Admin')) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    req.adminUser = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Authorization check failed.' });
  }
}
