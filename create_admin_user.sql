-- Create Admin User for MSI Corporation
-- Run this in your DBeaver SQL editor

-- First, check if admin user exists
SELECT * FROM admin_users WHERE username = 'admin';

-- If no results, insert the admin user
INSERT INTO admin_users (username, password_hash, email) 
VALUES ('admin', '$2b$10$Ys2QU.Pzaix3TMUmdbo5W.Vc0QI29qTB7ZSajEwl/Wg1HTyiLpFqO', 'admin@msicorp.xyz')
ON CONFLICT (username) DO NOTHING;

-- Verify the admin user was created
SELECT username, email, created_at FROM admin_users WHERE username = 'admin'; 