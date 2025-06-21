const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from src/public directory
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 MSI Corporation server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'src', 'public')}`);
    console.log(`📄 Serving views from: ${path.join(__dirname, 'src', 'views')}`);
}); 