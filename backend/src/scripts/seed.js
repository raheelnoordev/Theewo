import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../config/db.js';

dotenv.config();

async function seed() {
  const email = process.env.ADMIN_EMAIL || 'admin@ewotechnologies.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const fullName = process.env.ADMIN_NAME || 'Site Administrator';

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `INSERT IGNORE INTO Roles (RoleName) VALUES ('Admin'), ('Editor')`
    );

    const [roleRows] = await connection.query(`SELECT RoleId FROM Roles WHERE RoleName = 'Admin'`);
    const adminRoleId = roleRows[0].RoleId;

    const passwordHash = await bcrypt.hash(password, 12);

    const [existing] = await connection.query('SELECT UserId FROM Users WHERE Email = ?', [email]);

    let userId;
    if (existing.length) {
      userId = existing[0].UserId;
      await connection.query('UPDATE Users SET PasswordHash = ?, FullName = ?, IsActive = 1 WHERE UserId = ?', [
        passwordHash,
        fullName,
        userId,
      ]);
      console.log(`Updated existing admin user: ${email}`);
    } else {
      const [result] = await connection.query(
        'INSERT INTO Users (FullName, Email, PasswordHash, IsActive) VALUES (?, ?, ?, 1)',
        [fullName, email, passwordHash]
      );
      userId = result.insertId;
      console.log(`Created admin user: ${email}`);
    }

    await connection.query('DELETE FROM UserRoles WHERE UserId = ?', [userId]);
    await connection.query('INSERT INTO UserRoles (UserId, RoleId) VALUES (?, ?)', [userId, adminRoleId]);

    const defaultSettings = [
      ['hero_title', 'Engineering Digital Excellence'],
      ['hero_subtitle', 'We design, build, and optimize enterprise-grade software products for organizations worldwide.'],
      ['stat_1_value', '10+'],
      ['stat_1_label', 'Core Specialties'],
      ['stat_2_value', '500+'],
      ['stat_2_label', 'Engineers Globally'],
      ['stat_3_value', '99.9%'],
      ['stat_3_label', 'Uptime SLA'],
      ['stat_4_value', '4.9/5'],
      ['stat_4_label', 'Client Satisfaction'],
      ['contact_email', 'info@ewotechnologies.com'],
      ['contact_phone', '+1 (214) 555-0199'],
      ['contact_address', '1200 Main Street, Suite 400, Dallas, TX 75202'],
    ];

    for (const [key, value] of defaultSettings) {
      await connection.query(
        `INSERT INTO SiteSettings (SettingKey, SettingValue) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE SettingValue = VALUES(SettingValue)`,
        [key, value]
      );
    }

    await connection.commit();
    console.log('Seed completed successfully.');
    console.log(`Login with: ${email} / ${password}`);
  } catch (err) {
    await connection.rollback();
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    connection.release();
    process.exit(0);
  }
}

seed();
