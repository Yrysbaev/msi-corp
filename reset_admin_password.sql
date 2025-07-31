-- Reset Admin Password for MSI Corporation
-- Run this in your DBeaver SQL editor

-- Update admin password to 'admin123'
UPDATE admin_users 
SET password_hash = '$2b$10$Ys2QU.Pzaix3TMUmdbo5W.Vc0QI29qTB7ZSajEwl/Wg1HTyiLpFqO'
WHERE username = 'admin';

-- Verify the update
SELECT username, email, updated_at FROM admin_users WHERE username = 'admin';

-- Test the password hash (this should return true)
-- You can test this in your application 