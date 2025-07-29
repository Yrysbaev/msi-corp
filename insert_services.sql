-- Insert Services Data for MSI Corporation
-- Run this in your DBeaver SQL editor

-- Clear existing services (optional - uncomment if you want to start fresh)
-- DELETE FROM services;

-- Insert MSI Corporation services
INSERT INTO services (name, description, icon) VALUES
('Custom Merchandise', 'Personalized products and branded merchandise for businesses and events. From custom uniforms to promotional items.', '🎁'),
('Event Photography', 'Professional photography services for special events, corporate functions, and personal occasions.', '📸'),
('Creative Solutions', 'Innovative creative services and strategic consulting to help your brand stand out.', '💡'),
('Brand Identity', 'Complete branding packages including logo design, color schemes, and brand guidelines.', '🎨'),
('Marketing Materials', 'Design and production of marketing collateral, business cards, and promotional materials.', '📋'),
('Product Photography', 'High-quality product photography for e-commerce and marketing campaigns.', '📷');

-- Verify the insertion
SELECT * FROM services ORDER BY id; 