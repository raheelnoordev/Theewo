import bcrypt from 'bcryptjs';

const password = process.env.ADMIN_PASSWORD || 'Admin@Ewo2026';
const hash = bcrypt.hashSync(password, 12);

console.log('-- Run this in phpMyAdmin after seed-professional.sql');
console.log(`-- Password: ${password}`);
console.log('');
console.log("INSERT INTO Roles (RoleName) VALUES ('Admin'), ('Editor') ON DUPLICATE KEY UPDATE RoleName = VALUES(RoleName);");
console.log('');
console.log(`INSERT INTO Users (FullName, Email, PasswordHash, IsActive) VALUES ('Site Administrator', 'admin@ewotechnologies.com', '${hash}', 1) ON DUPLICATE KEY UPDATE PasswordHash = VALUES(PasswordHash), IsActive = 1;`);
console.log('');
console.log("INSERT IGNORE INTO UserRoles (UserId, RoleId) SELECT u.UserId, r.RoleId FROM Users u, Roles r WHERE u.Email = 'admin@ewotechnologies.com' AND r.RoleName = 'Admin';");
