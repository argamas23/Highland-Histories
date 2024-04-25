// backend/routes.js or backend/index.js

const express = require('express');
const upload = require('./src/utils/upload');
const app = express();

app.use('/uploads', express.static('uploads')); // Serve static files from uploads directory

// POST endpoint for file upload
app.post('/api/archives/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file here
  res.json({ message: "File uploaded successfully", filename: req.file.filename });
});

// ... other routes for update, delete etc.

module.exports = app;