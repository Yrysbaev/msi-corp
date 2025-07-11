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

// Admin credentials (in production, these should be stored in environment variables or database)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// In-memory storage for dynamic content (in production, use a database)
let dynamicContent = {
    services: [
        { id: 1, name: 'Web Development', description: 'Custom websites and web applications', icon: '🛠️' },
        { id: 2, name: 'Graphic Design', description: 'Brand identity and visual design', icon: '🎨' },
        { id: 3, name: 'Digital Marketing', description: 'SEO, social media, and content marketing', icon: '📈' }
    ],
    portfolio: [
        { id: 1, name: 'E-commerce Website', category: 'Web Development', image: 'https://via.placeholder.com/300x200', description: 'A professional e-commerce platform' },
        { id: 2, name: 'Brand Identity', category: 'Graphic Design', image: 'https://via.placeholder.com/300x200', description: 'Complete brand identity package' }
    ],
    websiteContent: {
        hero: {
            title: 'We Create. We Capture. We Customize.',
            subtitle: 'Visionary works that connect, express, and inspire.'
        },
        about: {
            text: 'MSI Corporation is a multi-service creative company dedicated to bringing ideas to life. From custom merchandise to capturing unforgettable moments, we combine creativity with professionalism to deliver exceptional results that resonate.'
        },
        contact: {
            email: 'info@msicorp.com',
            phone: '+1 (555) 123-4567'
        }
    }
};

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
        console.log('🔄 Serving dynamic homepage...');
        console.log('📊 Current services:', dynamicContent.services.length);
        console.log('📊 Current services data:', dynamicContent.services);
        
        // Read the static HTML template
        let htmlContent = await fs.readFile(path.join(__dirname, 'src', 'views', 'index.html'), 'utf8');
        console.log('📄 HTML template loaded, length:', htmlContent.length);
        
        // Replace static content with dynamic content
        htmlContent = htmlContent.replace(
            /<h1 class="hero-title">.*?<\/h1>/s,
            `<h1 class="hero-title">${dynamicContent.websiteContent.hero.title}</h1>`
        );
        
        htmlContent = htmlContent.replace(
            /<p class="hero-subtitle">.*?<\/p>/s,
            `<p class="hero-subtitle">${dynamicContent.websiteContent.hero.subtitle}</p>`
        );
        
        htmlContent = htmlContent.replace(
            /<p>MSI Corporation is a multi-service creative company.*?<\/p>/s,
            `<p>${dynamicContent.websiteContent.about.text}</p>`
        );
        
        // Replace services section
        const servicesHtml = dynamicContent.services.map(service => `
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
        const portfolioHtml = dynamicContent.portfolio.map(project => `
            <div class="portfolio-item">
                <img src="${project.image}" alt="${project.name}">
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
        
        console.log('✅ Dynamic homepage generated successfully');
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

    try {
        // In production, you should hash passwords and store them securely
        // For demo purposes, we're using plain text comparison
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            req.session.isAuthenticated = true;
            req.session.username = username;
            res.json({ success: true, message: 'Login successful' });
        } else {
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
app.get('/api/admin/stats', requireAuth, (req, res) => {
    // Mock statistics data
    const stats = {
        totalServices: dynamicContent.services.length,
        portfolioItems: dynamicContent.portfolio.length,
        contactMessages: 3,
        siteVisits: 1247
    };
    res.json(stats);
});

app.get('/api/admin/services', requireAuth, (req, res) => {
    res.json(dynamicContent.services);
});

app.post('/api/admin/services', requireAuth, (req, res) => {
    const { name, description, icon } = req.body;
    const newService = {
        id: Date.now(),
        name,
        description,
        icon: icon || '🛠️'
    };
    dynamicContent.services.push(newService);
    res.json({ success: true, service: newService });
});

app.put('/api/admin/services/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const { name, description, icon } = req.body;
    
    const serviceIndex = dynamicContent.services.findIndex(s => s.id == id);
    if (serviceIndex !== -1) {
        dynamicContent.services[serviceIndex] = {
            ...dynamicContent.services[serviceIndex],
            name,
            description,
            icon: icon || '🛠️'
        };
        res.json({ success: true, service: dynamicContent.services[serviceIndex] });
    } else {
        res.status(404).json({ success: false, message: 'Service not found' });
    }
});

app.delete('/api/admin/services/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const serviceIndex = dynamicContent.services.findIndex(s => s.id == id);
    if (serviceIndex !== -1) {
        dynamicContent.services.splice(serviceIndex, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Service not found' });
    }
});

app.get('/api/admin/portfolio', requireAuth, (req, res) => {
    res.json(dynamicContent.portfolio);
});

app.post('/api/admin/portfolio', requireAuth, upload.single('image'), (req, res) => {
    try {
        const { name, category, description, url } = req.body;
        
        // Handle image upload
        let imageUrl = 'https://via.placeholder.com/300x200'; // Default placeholder
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        
        const newProject = {
            id: Date.now(),
            name,
            category,
            description,
            image: imageUrl,
            url: url || ''
        };
        dynamicContent.portfolio.push(newProject);
        res.json({ success: true, project: newProject });
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        res.status(500).json({ success: false, message: 'Error creating portfolio item' });
    }
});

app.put('/api/admin/portfolio/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, url } = req.body;
        
        const projectIndex = dynamicContent.portfolio.findIndex(p => p.id == id);
        if (projectIndex !== -1) {
            let imageUrl = dynamicContent.portfolio[projectIndex].image; // Keep existing image
            
            // Handle new image upload
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            } else if (name && name !== dynamicContent.portfolio[projectIndex].name) {
                // Rename existing file if project name changed and no new file uploaded
                const currentImagePath = path.join(__dirname, 'src', 'public', imageUrl.replace('/uploads/', ''));
                try {
                    const newPath = await renameUploadedFile(currentImagePath, name);
                    imageUrl = `/uploads/${path.basename(newPath)}`;
                } catch (renameError) {
                    console.error('Error renaming file:', renameError);
                    // Continue with old filename if rename fails
                }
            }
            
            dynamicContent.portfolio[projectIndex] = {
                ...dynamicContent.portfolio[projectIndex],
                name,
                category,
                description,
                image: imageUrl,
                url: url || ''
            };
            res.json({ success: true, project: dynamicContent.portfolio[projectIndex] });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        res.status(500).json({ success: false, message: 'Error updating portfolio item' });
    }
});

app.delete('/api/admin/portfolio/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const projectIndex = dynamicContent.portfolio.findIndex(p => p.id == id);
    if (projectIndex !== -1) {
        dynamicContent.portfolio.splice(projectIndex, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Project not found' });
    }
});

app.put('/api/admin/content', requireAuth, (req, res) => {
    const { heroTitle, heroSubtitle, aboutText, contactEmail, contactPhone } = req.body;
    
    if (heroTitle) dynamicContent.websiteContent.hero.title = heroTitle;
    if (heroSubtitle) dynamicContent.websiteContent.hero.subtitle = heroSubtitle;
    if (aboutText) dynamicContent.websiteContent.about.text = aboutText;
    if (contactEmail) dynamicContent.websiteContent.contact.email = contactEmail;
    if (contactPhone) dynamicContent.websiteContent.contact.phone = contactPhone;
    
    res.json({ success: true, content: dynamicContent.websiteContent });
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

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Needed for Render/Heroku
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Admin panel available at http://localhost:${PORT}/admin/login`);
    console.log(`Default admin credentials: ${ADMIN_USERNAME} / ${ADMIN_PASSWORD}`);
}); 