-- MSI Corporation Database Setup
-- Run these commands in your Render PostgreSQL database

-- Create admin_users table for authentication
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create website_content table for dynamic content
CREATE TABLE website_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(500),
    subtitle VARCHAR(500),
    content TEXT,
    email VARCHAR(255),
    phone VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT '🛠️',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolio table (stores metadata + Cloudinary URLs)
CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500), -- Cloudinary URL
    url VARCHAR(500), -- Project URL (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
-- Proper bcrypt hash generated for 'admin123'
INSERT INTO admin_users (username, password_hash, email) VALUES
('admin', '$2b$10$Ys2QU.Pzaix3TMUmdbo5W.Vc0QI29qTB7ZSajEwl/Wg1HTyiLpFqO', 'admin@msicorp.xyz');

-- Insert default website content
INSERT INTO website_content (section, title, subtitle, content, email, phone) VALUES
('hero', 'We Create. We Capture. We Customize.', 'Visionary works that connect, express, and inspire.', NULL, NULL, NULL),
('about', NULL, NULL, 'MSI Corporation is a creative services company specializing in custom merchandise, professional photography, and innovative creative solutions. We bring your ideas to life through personalized products, stunning visual content, and strategic creative consulting.', NULL, NULL),
('contact', NULL, NULL, NULL, 'info@msicorp.xyz', '+1 (555) 123-4567');

-- Insert default services
INSERT INTO services (name, description, icon) VALUES
('Custom Merchandise', 'Personalized products and branded merchandise', '🎁'),
('Event Photography', 'Professional photography services', '📸'),
('Creative Solutions', 'Innovative creative services and consulting', '💡');

-- Insert default portfolio items
INSERT INTO portfolio (name, category, description, image_url) VALUES
('Royal Moving Company', 'Branding', 'Logo design and brand identity for premium moving service', '/images/royal-moving-logo.png'),
('FSN Style', 'Custom Merchandise', 'Custom uniforms and branded merchandise collaboration', '/images/fsn-style-logo.png'),
('Harmony Public Schools', 'Creative Solutions', 'Educational branding and marketing materials', '/images/harmony-schools-logo.png'),
('KGSA', 'Creative Solutions', 'Professional branding and creative services', '/images/kgsa-logo.png');

-- Add indexes for better performance
CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_services_name ON services(name);
CREATE INDEX idx_portfolio_category ON portfolio(category);
CREATE INDEX idx_portfolio_created_at ON portfolio(created_at); 