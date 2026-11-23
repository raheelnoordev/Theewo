-- ================================================================
-- FIX ADMIN LOGIN (401 error)
-- Problem: PasswordHash has plain text "demo123" but API needs bcrypt
-- Run in phpMyAdmin > SQL tab
-- ================================================================

-- 1) Ensure Admin role exists
INSERT INTO Roles (RoleName) VALUES ('Admin'), ('Editor')
ON DUPLICATE KEY UPDATE RoleName = VALUES(RoleName);

-- 2) Update password to bcrypt hash for: demo123
--    (generated with bcrypt cost 12)
UPDATE Users
SET PasswordHash = '$2b$12$jIS6s7a.AgpvgeQKUhqR5uMtiDANjs.DXePRkTmGRADx6AT0NgwiO',
    IsActive = 1
WHERE Email = 'admin@syncsquad.pk';

-- 3) Assign Admin role to this user
DELETE ur FROM UserRoles ur
INNER JOIN Users u ON ur.UserId = u.UserId
WHERE u.Email = 'admin@syncsquad.pk';

INSERT INTO UserRoles (UserId, RoleId)
SELECT u.UserId, r.RoleId
FROM Users u, Roles r
WHERE u.Email = 'admin@syncsquad.pk' AND r.RoleName = 'Admin';

-- ================================================================
-- LOGIN AFTER RUNNING THIS SQL:
--   URL:      https://theewotech.com/admin/login
--   Email:    admin@syncsquad.pk
--   Password: demo123
-- ================================================================

-- Optional: fix other users too (same password demo123)
UPDATE Users
SET PasswordHash = '$2b$12$jIS6s7a.AgpvgeQKUhqR5uMtiDANjs.DXePRkTmGRADx6AT0NgwiO'
WHERE PasswordHash = 'demo123' OR PasswordHash NOT LIKE '$2%';
