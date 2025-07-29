-- Tracking System Setup for MSI Corporation
-- Run this in your DBeaver SQL editor

-- Create visits tracking table
CREATE TABLE IF NOT EXISTS site_visits (
    id SERIAL PRIMARY KEY,
    page VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(255)
);

-- Create unique visitors tracking
CREATE TABLE IF NOT EXISTS unique_visitors (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45) UNIQUE,
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_visits INTEGER DEFAULT 1
);

-- Create daily stats table
CREATE TABLE IF NOT EXISTS daily_stats (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE DEFAULT CURRENT_DATE,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert today's stats if not exists
INSERT INTO daily_stats (date, page_views, unique_visitors) 
VALUES (CURRENT_DATE, 0, 0)
ON CONFLICT (date) DO NOTHING;

-- Add indexes for better performance
CREATE INDEX idx_site_visits_date ON site_visits(visit_date);
CREATE INDEX idx_site_visits_page ON site_visits(page);
CREATE INDEX idx_unique_visitors_ip ON unique_visitors(ip_address);
CREATE INDEX idx_daily_stats_date ON daily_stats(date); 