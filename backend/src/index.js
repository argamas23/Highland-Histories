// index.js
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const archiveRoutes = require('./routes/archiveRoutes');
const app = express();
const routes = require('./routes'); // Import routes

const cors = require('cors');
app.options('*', cors()); // Enable pre-flight across the board
app.use(cors({
  origin: 'http://localhost:3000', // or your specific allowed domain
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // to support session cookies from the browser
}));

// mongoose.connect('yourMongoDBUrl', { useNewUrlParser: true, useUnifiedTopology: true });

// const port = process.env.PORT || 3001; // Use the environment port or 3001 if local

// Middleware to parse request bodies. Necessary for POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your actual MongoDB URI
const mongoURI = "mongodb+srv://aish:aish@dassa1.nyvfikg.mongodb.net/?retryWrites=true&w=majority&appName=dassA1";

// Connect to MongoDB using Mongoose with additional options
mongoose.connect(mongoURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  connectTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000 // Increase socket timeout as well
}).then(() => {
  console.log('Successfully connected to MongoDB.');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
// Connect to MongoDB
// mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });


//Routes
app.use('/',routes);
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



