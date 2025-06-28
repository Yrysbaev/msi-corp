# MSI Corporation Website 

A modern, professional website for MSI Corporation - a multi-service creative company specializing in web development, graphic design, and digital marketing.

## Features

- **Modern Design**: Clean, professional design with a dark blue color palette
- **Responsive Layout**: Fully responsive design that works on all devices
- **Admin Panel**: Secure admin dashboard for content management
- **Professional Branding**: Consistent MSI Corporation branding throughout

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with modern design principles
- **Authentication**: Express sessions for admin panel security
- **Server**: Express.js server with static file serving

## Color Palette

- Primary Dark Blue: `#00072D`
- Secondary Dark Blue: `#001C55`
- Medium Blue: `#0A2472`
- Light Blue: `#0E6BA8`
- Accent Blue: `#A6E1FA`

## Fonts

- **Headings**: Montserrat (Bold, Semi-bold, Regular)
- **Body Text**: DM Sans (Regular, Medium, Semi-bold)

## Project Structure

```
msi-corp/
├── src/
│   ├── public/
│   │   ├── css/
│   │   │   ├── style.css          # Main website styles
│   │   │   └── admin.css          # Admin panel styles
│   │   ├── js/
│   │   │   ├── script.js          # Main website JavaScript
│   │   │   └── admin.js           # Admin panel JavaScript
│   │   └── images/
│   │       ├── logo.png
│   │       └── hero.mp4
│   └── views/
│       ├── index.html             # Main website
│       ├── login.html             # Admin login page
│       └── admin.html             # Admin dashboard
├── server.js                      # Express server
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd msi-corp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Admin Panel

The website includes a secure admin panel for content management.

### Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Use the default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

### Admin Panel Features

- **Dashboard**: Overview of website statistics and quick actions
- **Content Management**: Edit website content sections
- **Services Management**: Add, edit, and delete services
- **Portfolio Management**: Manage portfolio projects
- **Settings**: Update admin account and site settings

### Security Features

- Session-based authentication
- Protected admin routes
- Secure logout functionality
- Environment variable support for credentials

### Customizing Admin Credentials

For production, set environment variables:

```bash
export ADMIN_USERNAME=your_username
export ADMIN_PASSWORD=your_secure_password
export SESSION_SECRET=your_session_secret
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Deployment

### Environment Variables

Set these environment variables for production:

- `PORT`: Server port (default: 3000)
- `ADMIN_USERNAME`: Admin panel username
- `ADMIN_PASSWORD`: Admin panel password
- `SESSION_SECRET`: Session encryption secret
- `NODE_ENV`: Set to 'production' for secure cookies

### Deployment Platforms

The application can be deployed to:

- **Vercel**: Use the included `vercel.json` configuration
- **Netlify**: Use the included `netlify.toml` configuration
- **Heroku**: Deploy directly from the repository
- **DigitalOcean**: Deploy to App Platform or Droplet

## API Endpoints

### Public Endpoints

- `GET /` - Main website
- `GET /admin/login` - Admin login page

### Protected Endpoints (Require Authentication)

- `GET /admin` - Admin dashboard
- `GET /api/admin/stats` - Website statistics
- `GET /api/admin/services` - Services data
- `GET /api/admin/portfolio` - Portfolio data
- `POST /admin/login` - Admin login
- `GET /logout` - Admin logout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**MSI Corporation** - Transforming ideas into digital reality. 