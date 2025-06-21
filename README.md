# MSI Corporation Website

A modern, bold, and visionary website for MSI Corporation - a multi-service creative company.

## Features

- 🎨 Modern, bold design with dark blue color palette
- 📱 Fully responsive design
- 🎬 Hero section with video background
- 🛠️ Services showcase
- 📸 Portfolio gallery
- 📞 Contact form
- 🍔 Mobile-friendly navigation

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: Montserrat (headings), DM Sans (body)
- **Colors**: Custom dark blue palette

## Project Structure

```
msi-corp/
├── src/
│   ├── public/           # Static assets
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── script.js
│   │   └── images/       # Images and media files
│   └── views/            # HTML templates
│       └── index.html
├── server.js             # Express server
├── package.json          # Node.js dependencies
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

## Development

- **Port**: 3000 (configurable via PORT environment variable)
- **Static files**: Served from `src/public/`
- **Views**: Served from `src/views/`
- **Hot reload**: Restart the server after making changes

## File Organization

### Static Assets (`src/public/`)
- **CSS**: `src/public/css/style.css` - Main stylesheet
- **JavaScript**: `src/public/js/script.js` - Client-side logic
- **Images**: `src/public/images/` - All images and media files

### Views (`src/views/`)
- **HTML**: `src/views/index.html` - Main page template

### Server
- **server.js** - Express server configuration and routes

## Customization

### Colors
The color palette is defined in CSS variables:
- Deep Navy: `#00072D`
- Rich Navy: `#001C55`
- Deep Blue: `#0A2472`
- Strong Blue: `#0E6BA8`
- Light Blue: `#A6E1FA`

### Fonts
- Headings: Montserrat (Google Fonts)
- Body: DM Sans (Google Fonts)

## License

ISC 