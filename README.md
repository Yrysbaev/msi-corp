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
├── vercel.json          # Vercel deployment config
├── netlify.toml         # Netlify deployment config
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

## Deployment

### Option 1: Vercel (Recommended for Node.js)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Node.js project
4. Deploy with the included `vercel.json` configuration

### Option 2: Netlify (Static Hosting)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm install`
4. Set publish directory: `src/public`
5. Deploy using the included `netlify.toml` configuration

### Option 3: Railway/Render/Heroku
1. Push your code to GitHub
2. Connect your repository to your chosen platform
3. Set the start command: `npm start`
4. Deploy (platforms will auto-detect Node.js)

### Option 4: Static Hosting (GitHub Pages, etc.)
Use the static version in `src/public/index.html` with relative paths.

## File Organization

### Static Assets (`src/public/`)
- **CSS**: `src/public/css/style.css` - Main stylesheet
- **JavaScript**: `src/public/js/script.js` - Client-side logic
- **Images**: `src/public/images/` - All images and media files
- **Static HTML**: `src/public/index.html` - For static hosting

### Views (`src/views/`)
- **HTML**: `src/views/index.html` - Main page template (for Node.js)

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