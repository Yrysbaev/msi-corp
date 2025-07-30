require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const multer = require('multer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'src', 'public', 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Generate descriptive filename based on project name
        const projectName = req.body.name || 'portfolio';
        const cleanName = projectName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Function to rename uploaded files
function renameUploadedFile(oldPath, newName) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(oldPath);
        const ext = path.extname(oldPath);
        const cleanName = newName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const newPath = path.join(dir, `${cleanName}${ext}`);
        
        fs.rename(oldPath, newPath)
            .then(() => resolve(newPath))
            .catch(reject);
    });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Tracking middleware
app.use(async (req, res, next) => {
    // Skip tracking for admin routes and API calls
    if (req.path.startsWith('/admin') || req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
    }
    
    try {
        if (pool) {
            const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
            const userAgent = req.headers['user-agent'];
            const referrer = req.headers.referer || '';
            const page = req.path;
            
            // Record the visit
            await pool.query(
                'INSERT INTO site_visits (page, ip_address, user_agent, referrer) VALUES ($1, $2, $3, $4)',
                [page, ip, userAgent, referrer]
            );
            
            // Update unique visitors
            await pool.query(
                `INSERT INTO unique_visitors (ip_address, last_visit, total_visits) 
                 VALUES ($1, CURRENT_TIMESTAMP, 1)
                 ON CONFLICT (ip_address) 
                 DO UPDATE SET last_visit = CURRENT_TIMESTAMP, total_visits = unique_visitors.total_visits + 1`,
                [ip]
            );
            
            // Update daily stats
            await pool.query(
                `INSERT INTO daily_stats (date, page_views, unique_visitors) 
                 VALUES (CURRENT_DATE, 1, 1)
                 ON CONFLICT (date) 
                 DO UPDATE SET page_views = daily_stats.page_views + 1`,
                []
            );
        }
    } catch (error) {
        console.error('Tracking error:', error);
        // Don't block the request if tracking fails
    }
    
    next();
});

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'msi-corp-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Database connection
let pool;
if (process.env.DATABASE_URL) {
    pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Needed for Render/Heroku
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Database connected successfully');
    }
});
} else {
    console.log('⚠️  No DATABASE_URL found - running in demo mode with static data');
}

// Database helper functions
async function getWebsiteContent() {
    if (!pool) {
        // Return static data if no database
        return {
            hero: {
                title: 'We Create. We Capture. We Customize.',
                subtitle: 'Visionary works that connect, express, and inspire.'
            },
            about: {
                content: 'MSI Corporation is a multi-service creative company dedicated to bringing ideas to life. From custom merchandise to capturing unforgettable moments, we combine creativity with professionalism to deliver exceptional results that resonate.'
            },
            contact: {
                email: 'info@msicorp.xyz',
                phone: '+1 (555) 123-4567'
            }
        };
    }
    
    try {
        const result = await pool.query('SELECT * FROM website_content');
        const content = {};
        result.rows.forEach(row => {
            content[row.section] = {
                title: row.title,
                subtitle: row.subtitle,
                content: row.content,
                email: row.email,
                phone: row.phone
            };
        });
        return content;
    } catch (error) {
        console.error('Error fetching website content:', error);
        return {};
    }
}

async function getServices() {
    if (!pool) {
        // Return static data if no database
        return [
            { name: 'Custom Merchandise', description: 'Personalized products and branded merchandise', icon: '🎁' },
            { name: 'Event Photography', description: 'Professional photography for special events', icon: '📸' },
            { name: 'Creative Solutions', description: 'Innovative creative services and consulting', icon: '💡' }
        ];
    }
    
    try {
        const result = await pool.query('SELECT * FROM services ORDER BY created_at');
        return result.rows;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

async function getPortfolio() {
    if (!pool) {
        // Return static data if no database
        return [
            { name: 'Royal Moving Company', category: 'Branding', description: 'Logo design and brand identity for premium moving service', image_url: '/images/royal-moving-logo.png' },
            { name: 'FSN Style', category: 'Custom Merchandise', description: 'Custom uniforms and branded merchandise collaboration', image_url: '/images/fsn-style-logo.png' },
            { name: 'Harmony Public Schools', category: 'Creative Solutions', description: 'Educational branding and marketing materials', image_url: '/images/harmony-schools-logo.png' },
            { name: 'KGSA', category: 'Creative Solutions', description: 'Professional branding and creative services', image_url: '/images/kgsa-logo.svg' }
        ];
    }
    
    try {
        const result = await pool.query('SELECT * FROM portfolio ORDER BY created_at');
        return result.rows;
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return [];
    }
}

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// Routes
app.get('/', async (req, res) => {
    try {
        console.log('🔄 Serving dynamic homepage from database...');
        
        // Fetch data from database
        const [websiteContent, services, portfolio] = await Promise.all([
            getWebsiteContent(),
            getServices(),
            getPortfolio()
        ]);
        
        console.log('📊 Fetched from database:', { 
            services: services.length, 
            portfolio: portfolio.length,
            contentSections: Object.keys(websiteContent).length
        });
        
        // Read the static HTML template
        let htmlContent = await fs.readFile(path.join(__dirname, 'src', 'views', 'index.html'), 'utf8');
        console.log('📄 HTML template loaded, length:', htmlContent.length);
        
        // Replace static content with dynamic content
        if (websiteContent.hero) {
            htmlContent = htmlContent.replace(
                /<h1 class="hero-title">.*?<\/h1>/s,
                `<h1 class="hero-title">${websiteContent.hero.title || 'We Create. We Capture. We Customize.'}</h1>`
            );
            
            htmlContent = htmlContent.replace(
                /<p class="hero-subtitle">.*?<\/p>/s,
                `<p class="hero-subtitle">${websiteContent.hero.subtitle || 'Visionary works that connect, express, and inspire.'}</p>`
            );
        }
        
        if (websiteContent.about) {
            htmlContent = htmlContent.replace(
                /<p>MSI Corporation is a multi-service creative company.*?<\/p>/s,
                `<p>${websiteContent.about.content || 'MSI Corporation is a multi-service creative company dedicated to bringing ideas to life.'}</p>`
            );
        }
        
        // Replace services section
        const servicesHtml = services.map(service => `
            <div class="service-card">
                <h3>${service.icon} ${service.name}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
        
        console.log('🔧 Generated services HTML:', servicesHtml);
        
        htmlContent = htmlContent.replace(
            /<div class="services-grid">[\s\S]*?<\/div>/s,
            `<div class="services-grid">${servicesHtml}</div>`
        );
        
        // Replace portfolio section
        const portfolioHtml = portfolio.map(project => `
            <div class="portfolio-item">
                <img src="${project.image_url}" alt="${project.name}">
                <div class="portfolio-overlay">
                    <h3>${project.name}</h3>
                    <p>${project.category}</p>
                </div>
            </div>
        `).join('');
        
        console.log('🎨 Generated portfolio HTML:', portfolioHtml);
        
        htmlContent = htmlContent.replace(
            /<div class="portfolio-grid">[\s\S]*?<\/div>/s,
            `<div class="portfolio-grid">${portfolioHtml}</div>`
        );
        
        console.log('✅ Dynamic homepage generated successfully from database');
        res.send(htmlContent);
    } catch (error) {
        console.error('❌ Error serving homepage:', error);
        res.status(500).send('Error loading homepage');
    }
});

// Admin login page
app.get('/admin/login', (req, res) => {
    // If already logged in, redirect to admin dashboard
    if (req.session.isAuthenticated) {
        return res.redirect('/admin');
    }
    res.sendFile(path.join(__dirname, 'src', 'views', 'login.html'));
});

// Admin login POST endpoint
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('🔐 Login attempt:', { username, password: password ? '***' : 'NOT PROVIDED' });

    // Demo mode login (when no database)
    if (!pool) {
        if (username === 'admin' && password === 'admin123') {
            req.session.isAuthenticated = true;
            req.session.username = username;
            req.session.userId = 1;
            console.log('✅ Demo mode login successful for user:', username);
            res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('❌ Demo mode login failed - invalid credentials');
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        return;
    }

    try {
        // Query database for user
        const result = await pool.query(
            'SELECT * FROM admin_users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            console.log('❌ Login failed - user not found:', username);
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const user = result.rows[0];
        
        // Compare password with bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (isValidPassword) {
            req.session.isAuthenticated = true;
            req.session.username = username;
            req.session.userId = user.id;
            console.log('✅ Login successful for user:', username);
            res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('❌ Login failed - invalid password for user:', username);
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Admin dashboard (protected route)
app.get('/admin', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'admin.html'));
});

// Debug endpoint to check database status
app.get('/debug', (req, res) => {
    const debugInfo = {
        databaseConnected: !!pool,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    };
    
    if (pool) {
        // Test database connection
        pool.query('SELECT NOW() as current_time, (SELECT COUNT(*) FROM admin_users) as admin_count')
            .then(result => {
                debugInfo.databaseTest = 'Success';
                debugInfo.currentTime = result.rows[0].current_time;
                debugInfo.adminCount = result.rows[0].admin_count;
                res.json(debugInfo);
            })
            .catch(error => {
                debugInfo.databaseTest = 'Failed';
                debugInfo.databaseError = error.message;
                res.json(debugInfo);
            });
    } else {
        debugInfo.databaseTest = 'No pool';
        res.json(debugInfo);
    }
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/admin/login');
    });
});

// API endpoints for admin functionality (protected)
app.get('/api/admin/stats', requireAuth, async (req, res) => {
    try {
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const servicesResult = await pool.query('SELECT COUNT(*) FROM services');
        const portfolioResult = await pool.query('SELECT COUNT(*) FROM portfolio');
        
        // Get real tracking stats
        const visitsResult = await pool.query('SELECT COUNT(*) FROM site_visits');
        const uniqueVisitorsResult = await pool.query('SELECT COUNT(*) FROM unique_visitors');
        const todayStatsResult = await pool.query('SELECT page_views, unique_visitors FROM daily_stats WHERE date = CURRENT_DATE');
        
        const stats = {
            totalServices: parseInt(servicesResult.rows[0].count),
            portfolioItems: parseInt(portfolioResult.rows[0].count),
            contactMessages: 3,
            siteVisits: parseInt(visitsResult.rows[0].count),
            uniqueVisitors: parseInt(uniqueVisitorsResult.rows[0].count),
            todayViews: todayStatsResult.rows.length > 0 ? parseInt(todayStatsResult.rows[0].page_views) : 0,
            todayVisitors: todayStatsResult.rows.length > 0 ? parseInt(todayStatsResult.rows[0].unique_visitors) : 0
        };
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Error fetching stats' });
    }
});

app.get('/api/admin/content', requireAuth, async (req, res) => {
    try {
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query('SELECT * FROM website_content');
        const websiteContent = {};
        result.rows.forEach(row => {
            websiteContent[row.section] = row;
        });
        
        res.json(websiteContent);
    } catch (error) {
        console.error('Error fetching website content:', error);
        res.status(500).json({ success: false, message: 'Error fetching website content' });
    }
});

app.get('/api/admin/services', requireAuth, async (req, res) => {
    try {
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query('SELECT * FROM services ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ success: false, message: 'Error fetching services' });
    }
});

app.post('/api/admin/services', requireAuth, async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query(
            'INSERT INTO services (name, description, icon) VALUES ($1, $2, $3) RETURNING *',
            [name, description, icon || '🛠️']
        );
        
        res.json({ success: true, service: result.rows[0] });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ success: false, message: 'Error creating service' });
    }
});

app.put('/api/admin/services/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, icon } = req.body;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query(
            'UPDATE services SET name = $1, description = $2, icon = $3 WHERE id = $4 RETURNING *',
            [name, description, icon || '🛠️', id]
        );
        
        if (result.rows.length > 0) {
            res.json({ success: true, service: result.rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Service not found' });
        }
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ success: false, message: 'Error updating service' });
    }
});

app.delete('/api/admin/services/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Service not found' });
        }
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: 'Error deleting service' });
    }
});

app.get('/api/admin/portfolio', requireAuth, async (req, res) => {
    try {
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query('SELECT * FROM portfolio ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ success: false, message: 'Error fetching portfolio' });
    }
});

app.post('/api/admin/portfolio', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { name, category, description, url } = req.body;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        // Handle image upload
        let imageUrl = '/images/placeholder.png'; // Default placeholder
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        
        const result = await pool.query(
            'INSERT INTO portfolio (name, category, description, image_url, url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, category, description, imageUrl, url || '']
        );
        
        res.json({ success: true, project: result.rows[0] });
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        res.status(500).json({ success: false, message: 'Error creating portfolio item' });
    }
});

app.put('/api/admin/portfolio/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, url } = req.body;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        // Get current portfolio item
        const currentResult = await pool.query('SELECT * FROM portfolio WHERE id = $1', [id]);
        if (currentResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        
        let imageUrl = currentResult.rows[0].image_url; // Keep existing image
        
        // Handle new image upload
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        
        const result = await pool.query(
            'UPDATE portfolio SET name = $1, category = $2, description = $3, image_url = $4, url = $5 WHERE id = $6 RETURNING *',
            [name, category, description, imageUrl, url || '', id]
        );
        
        res.json({ success: true, project: result.rows[0] });
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        res.status(500).json({ success: false, message: 'Error updating portfolio item' });
    }
});

app.delete('/api/admin/portfolio/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        const result = await pool.query('DELETE FROM portfolio WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        res.status(500).json({ success: false, message: 'Error deleting portfolio item' });
    }
});

app.put('/api/admin/content', requireAuth, async (req, res) => {
    try {
        const { heroTitle, heroSubtitle, aboutText, contactEmail, contactPhone } = req.body;
        
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }
        
        // Update hero section
        if (heroTitle) {
            await pool.query(
                'UPDATE website_content SET title = $1 WHERE section = $2',
                [heroTitle, 'hero']
            );
        }
        
        if (heroSubtitle) {
            await pool.query(
                'UPDATE website_content SET subtitle = $1 WHERE section = $2',
                [heroSubtitle, 'hero']
            );
        }
        
        // Update about section
        if (aboutText) {
            await pool.query(
                'UPDATE website_content SET content = $1 WHERE section = $2',
                [aboutText, 'about']
            );
        }
        
        // Update contact section
        if (contactEmail) {
            await pool.query(
                'UPDATE website_content SET email = $1 WHERE section = $2',
                [contactEmail, 'contact']
            );
        }
        
        if (contactPhone) {
            await pool.query(
                'UPDATE website_content SET phone = $1 WHERE section = $2',
                [contactPhone, 'contact']
            );
        }
        
        // Get updated content
        const result = await pool.query('SELECT * FROM website_content');
        const websiteContent = {};
        result.rows.forEach(row => {
            websiteContent[row.section] = row;
        });
        
        res.json({ success: true, content: websiteContent });
    } catch (error) {
        console.error('Error updating website content:', error);
        res.status(500).json({ success: false, message: 'Error updating content' });
    }
});

// File management endpoints
app.post('/api/admin/files/rename', requireAuth, async (req, res) => {
    try {
        const { currentFileName, newFileName } = req.body;
        
        if (!currentFileName || !newFileName) {
            return res.status(400).json({ 
                success: false, 
                message: 'Both current and new file names are required' 
            });
        }
        
        const currentPath = path.join(uploadsDir, currentFileName);
        const newPath = path.join(uploadsDir, newFileName);
        
        // Check if current file exists
        try {
            await fs.access(currentPath);
        } catch (error) {
            return res.status(404).json({ 
                success: false, 
                message: 'File not found' 
            });
        }
        
        // Check if new filename already exists
        try {
            await fs.access(newPath);
            return res.status(400).json({ 
                success: false, 
                message: 'A file with the new name already exists' 
            });
        } catch (error) {
            // File doesn't exist, which is good
        }
        
        // Rename the file
        await fs.rename(currentPath, newPath);
        
        // Update any portfolio items that reference this file
        const oldUrl = `/uploads/${currentFileName}`;
        const newUrl = `/uploads/${newFileName}`;
        
        dynamicContent.portfolio.forEach(project => {
            if (project.image === oldUrl) {
                project.image = newUrl;
            }
        });
        
        res.json({ 
            success: true, 
            message: 'File renamed successfully',
            oldUrl,
            newUrl
        });
        
    } catch (error) {
        console.error('Error renaming file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error renaming file' 
        });
    }
});

// Get list of uploaded files
app.get('/api/admin/files', requireAuth, async (req, res) => {
    try {
        const files = await fs.readdir(uploadsDir);
        const fileList = await Promise.all(files.map(async file => {
            const filePath = path.join(uploadsDir, file);
            const stats = await fs.stat(filePath);
            return {
                name: file,
                size: stats.size,
                url: `/uploads/${file}`
            };
        }));
        
        res.json({ success: true, files: fileList });
    } catch (error) {
        console.error('Error reading uploads directory:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error reading files' 
        });
    }
});

// Delete uploaded file
app.delete('/api/admin/files/delete', requireAuth, async (req, res) => {
    try {
        const { fileName } = req.body;
        
        if (!fileName) {
            return res.status(400).json({ 
                success: false, 
                message: 'File name is required' 
            });
        }
        
        const filePath = path.join(uploadsDir, fileName);
        
        // Check if file exists
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(404).json({ 
                success: false, 
                message: 'File not found' 
            });
        }
        
        // Delete the file
        await fs.unlink(filePath);
        
        // Update any portfolio items that reference this file
        const fileUrl = `/uploads/${fileName}`;
        dynamicContent.portfolio.forEach(project => {
            if (project.image === fileUrl) {
                project.image = 'https://via.placeholder.com/300x200'; // Reset to placeholder
            }
        });
        
        res.json({ 
            success: true, 
            message: 'File deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting file' 
        });
    }
});

// Serve About Us page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'about.html'));
});

// Serve Services page
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'services.html'));
});

// Serve Under Construction page
app.get('/under-construction', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'under-construction.html'));
});

// Place this BEFORE error and 404 handlers!
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware for multer upload errors
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false, 
                message: 'File too large. Maximum size is 5MB.' 
            });
        }
        return res.status(400).json({ 
            success: false, 
            message: 'File upload error: ' + error.message 
        });
    }
    if (error.message === 'Only image files are allowed!') {
        return res.status(400).json({ 
            success: false, 
            message: 'Only image files (JPG, PNG, GIF, etc.) are allowed.' 
        });
    }
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler - redirect to under construction page
app.use((req, res) => {
    res.redirect('/under-construction');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Admin panel available at http://localhost:${PORT}/admin/login`);
    console.log('✅ Database-based authentication enabled');
}); 