-- Admin user SQL (password: Admin@Ewo2026)
-- Paste into phpMyAdmin after running seed-professional.sql

INSERT INTO Roles (RoleName) VALUES ('Admin'), ('Editor') ON DUPLICATE KEY UPDATE RoleName = VALUES(RoleName);

INSERT INTO Users (FullName, Email, PasswordHash, IsActive) VALUES ('Site Administrator', 'admin@ewotechnologies.com', '$2b$12$zqaQb1RJ3i93bmuTu2h45uy/EZ3DuHya7Ve2ElWq2SbsYzNDNb5ym', 1) ON DUPLICATE KEY UPDATE PasswordHash = VALUES(PasswordHash), IsActive = 1;

INSERT IGNORE INTO UserRoles (UserId, RoleId) SELECT u.UserId, r.RoleId FROM Users u, Roles r WHERE u.Email = 'admin@ewotechnologies.com' AND r.RoleName = 'Admin';
