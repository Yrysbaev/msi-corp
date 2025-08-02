# MSI Corporation Website

<div align="center">

![MSI Corporation Logo](src/public/images/logo.png)

**A modern, professional website for MSI Corporation - a multi-service creative company specializing in web development, graphic design, and digital marketing.**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Demo](#) • [Documentation](#) • [Report Issues](https://github.com/Yrysbaev/msi-corp/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 Overview

The MSI Corporation website is a comprehensive full-stack web application designed to showcase creative services while providing powerful content management capabilities. Built with modern web technologies, this project demonstrates professional web development practices and serves as a complete solution for small to medium-sized creative service companies.

### Key Highlights

- **🎨 Professional Design**: Modern, responsive design with consistent branding
- **🔐 Secure Admin Panel**: Protected content management system
- **📊 Analytics Integration**: Built-in visitor tracking and statistics
- **📱 Mobile-First**: Optimized for all devices and screen sizes
- **⚡ Performance Optimized**: Fast loading times and efficient code
- **🛡️ Security Focused**: Industry-standard security practices

## ✨ Features

### Public Website
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Dynamic Content**: Database-driven content management
- **Portfolio Gallery**: Image upload and management system
- **Contact Forms**: Validated contact forms with error handling
- **SEO Optimized**: Semantic HTML and meta tags
- **Accessibility**: WCAG 2.1 AA compliant design

### Admin Panel
- **Secure Authentication**: bcryptjs password hashing and session management
- **Dashboard Analytics**: Real-time website statistics and visitor tracking
- **Content Management**: Add, edit, and delete services and portfolio items
- **File Upload System**: Secure image upload with validation
- **User Management**: Admin account management and security settings

### Technical Features
- **Database Integration**: PostgreSQL with optimized queries and indexing
- **API Endpoints**: RESTful API for dynamic content delivery
- **Error Handling**: Comprehensive error handling and logging
- **Performance Monitoring**: Response time tracking and optimization
- **Security Measures**: Input validation, SQL injection prevention, XSS protection

## 🛠️ Technology Stack

### Backend
- **Node.js** (v18+) - JavaScript runtime environment
- **Express.js** (v4.18.2) - Web application framework
- **PostgreSQL** (v14+) - Relational database
- **bcryptjs** (v3.0.2) - Password hashing
- **express-session** (v1.18.1) - Session management
- **multer** (v2.0.1) - File upload handling

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript** - Client-side interactivity
- **Google Fonts** - Typography (Montserrat, DM Sans)

### Development Tools
- **npm** - Package management
- **Git** - Version control
- **VS Code** - Code editor (recommended)
- **DBeaver** - Database management

### Deployment
- **Vercel** - Serverless deployment
- **Netlify** - Static site hosting
- **Heroku** - Cloud platform
- **Render** - PostgreSQL hosting

## 📁 Project Structure

```
msi-corp/
├── src/
│   ├── public/
│   │   ├── css/
│   │   │   ├── style.css          # Main website styles
│   │   │   ├── admin.css          # Admin panel styles
│   │   │   └── services.css       # Services page styles
│   │   ├── js/
│   │   │   ├── script.js          # Main website JavaScript
│   │   │   └── admin.js           # Admin panel JavaScript
│   │   ├── images/
│   │   │   ├── logo.png           # Company logo
│   │   │   ├── hero.mp4           # Hero video
│   │   │   └── portfolio/         # Portfolio images
│   │   └── uploads/               # User uploaded files
│   └── views/
│       ├── index.html             # Homepage
│       ├── about.html             # About page
│       ├── services.html          # Services page
│       ├── admin.html             # Admin dashboard
│       ├── login.html             # Admin login
│       └── under-construction.html # Placeholder pages
├── server.js                      # Express server
├── package.json                   # Dependencies and scripts
├── database_setup.sql             # Database schema
├── tracking_setup.sql             # Analytics tables
├── vercel.json                    # Vercel deployment config
├── netlify.toml                   # Netlify deployment config
└── README.md                      # Project documentation
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **PostgreSQL** (v14 or higher)
- **Git**

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yrysbaev/msi-corp.git
   cd msi-corp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Connect to your PostgreSQL database
   psql -U your_username -d your_database
   
   # Run the setup scripts
   \i database_setup.sql
   \i tracking_setup.sql
   ```

4. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Website: http://localhost:3001
   - Admin Panel: http://localhost:3001/admin/login

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/msicorp

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=your_session_secret_key

# File Upload
UPLOAD_PATH=./src/public/uploads
MAX_FILE_SIZE=5242880

# Security
CORS_ORIGIN=http://localhost:3001
```

### Database Configuration

The application uses PostgreSQL with the following default tables:

- `admin_users` - Admin authentication
- `website_content` - Dynamic content
- `services` - Service offerings
- `portfolio` - Portfolio projects
- `site_visits` - Analytics tracking
- `unique_visitors` - Visitor statistics
- `daily_stats` - Daily analytics

## 📖 Usage

### Development Mode

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test
```

### Production Mode

```bash
# Set environment to production
export NODE_ENV=production

# Start the server
npm start
```

## 🔐 Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Use the default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

### Admin Features

#### Dashboard
- **Website Statistics**: Page views, unique visitors, daily trends
- **Quick Actions**: Add services, upload portfolio items
- **System Status**: Server health and performance metrics

#### Content Management
- **Services Management**: Add, edit, delete service offerings
- **Portfolio Management**: Upload and manage portfolio projects
- **Website Content**: Edit dynamic content sections
- **File Management**: Secure file upload and organization

#### Security Features
- **Session Management**: Secure session handling
- **Password Security**: bcryptjs hashing with salt
- **Input Validation**: Comprehensive form validation
- **File Upload Security**: Type and size validation

### Customizing Admin Credentials

For production deployment, update the admin credentials:

```bash
# Set environment variables
export ADMIN_USERNAME=your_username
export ADMIN_PASSWORD=your_secure_password
export SESSION_SECRET=your_session_secret

# Or update directly in database
UPDATE admin_users 
SET username = 'new_username', 
    password_hash = '$2b$12$...' 
WHERE id = 1;
```

## 📡 API Documentation

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Main website homepage |
| `GET` | `/about` | About page |
| `GET` | `/services` | Services page |
| `GET` | `/admin/login` | Admin login page |
| `GET` | `/api/services` | Get services data |
| `GET` | `/api/portfolio` | Get portfolio data |
| `GET` | `/api/content/:section` | Get website content |

### Protected Endpoints (Require Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin` | Admin dashboard |
| `GET` | `/api/admin/stats` | Website statistics |
| `GET` | `/api/admin/services` | Admin services data |
| `POST` | `/api/admin/services` | Create new service |
| `PUT` | `/api/admin/services/:id` | Update service |
| `DELETE` | `/api/admin/services/:id` | Delete service |
| `POST` | `/api/admin/portfolio/upload` | Upload portfolio item |
| `POST` | `/admin/login` | Admin authentication |
| `GET` | `/logout` | Admin logout |

### Authentication

Protected endpoints require a valid session. Include session cookies in requests:

```bash
# Login to get session
curl -X POST http://localhost:3001/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Use session for protected requests
curl -X GET http://localhost:3001/api/admin/stats \
  -b cookies.txt
```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

### Netlify Deployment

1. **Connect your GitHub repository to Netlify**
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `src/public`
3. **Set environment variables in Netlify dashboard**

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DATABASE_URL=your_database_url
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Environment Variables for Production

```bash
# Required for production
NODE_ENV=production
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_secure_session_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password

# Optional
PORT=3001
CORS_ORIGIN=https://yourdomain.com
UPLOAD_PATH=./src/public/uploads
```

## 🧪 Testing

### Manual Testing

The project includes comprehensive manual testing procedures:

```bash
# Test checklist
npm run test:manual
```

### Testing Areas

- **Frontend Testing**: Responsive design, form validation, user interactions
- **Backend Testing**: API endpoints, database operations, authentication
- **Security Testing**: Input validation, file upload security, session management
- **Performance Testing**: Load times, database query optimization
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge compatibility

### Performance Testing

```bash
# Run performance tests
npm run test:performance
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/msi-corp.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   npm test
   npm run test:manual
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

### Development Guidelines

- **Code Style**: Follow existing conventions
- **Documentation**: Update README and inline comments
- **Testing**: Include tests for new features
- **Security**: Follow security best practices
- **Performance**: Optimize for speed and efficiency

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 MSI Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🆘 Support

### Getting Help

If you need help with the MSI Corporation website:

1. **Check the documentation** - This README and inline code comments
2. **Search existing issues** - [GitHub Issues](https://github.com/Yrysbaev/msi-corp/issues)
3. **Create a new issue** - For bugs or feature requests
4. **Contact the development team** - For direct support

### Common Issues

#### Database Connection Issues
```bash
# Check database connection
psql -U your_username -d your_database -c "SELECT version();"

# Verify environment variables
echo $DATABASE_URL
```

#### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

#### File Upload Issues
```bash
# Check upload directory permissions
ls -la src/public/uploads/

# Create directory if missing
mkdir -p src/public/uploads
chmod 755 src/public/uploads
```

### Performance Optimization

- **Database**: Use connection pooling and query optimization
- **Images**: Compress and optimize images before upload
- **Caching**: Implement Redis for session and data caching
- **CDN**: Use a CDN for static assets in production

---

<div align="center">

**MSI Corporation** - Transforming ideas into digital reality.

[Website](#) • [GitHub](https://github.com/Yrysbaev/msi-corp) • [Issues](https://github.com/Yrysbaev/msi-corp/issues)

Made with ❤️ by the MSI Corporation Development Team

</div> 