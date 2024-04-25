// index.js

const express = require('express');
const mongoose = require('mongoose');
const archiveRoutes = require('./routes/archiveRoutes');
const app = express();
const app = require('./routes'); // Import routes

mongoose.connect('yourMongoDBUrl', { useNewUrlParser: true, useUnifiedTopology: true });

// const port = process.env.PORT || 3001; // Use the environment port or 3001 if local

// Middleware to parse request bodies. Necessary for POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });


//Routes
app.use('/api/archives', archiveRoutes);

// Sample GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Highland Histories Digital Archive System backend!');
});

// Other routes can be added here using app.get, app.post, app.put, app.delete, etc.

// Start the server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



