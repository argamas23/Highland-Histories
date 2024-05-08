const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/auth'); // Adjust the path as per your project structure
const archiveRoutes = require('./routes/archiveRoutes');
const app = express();
const routes = require('./routes'); // Import routes

// mongoose.connect("mongodb+srv://highlandhistoriesdeveloper:RvWKjUnNKacdWaX1@cluster0.pz0l5dq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/archives', archiveRoutes);

const cors = require('cors');
app.options('*', cors()); // Enable pre-flight across the board
app.use(cors({
  origin: 'http://localhost:3000', // or your specific allowed domain
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // to support session cookies from the browser
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your actual MongoDB URI
const mongoURI = "mongodb+srv://highlandhistoriesdeveloper:RvWKjUnNKacdWaX1@cluster0.pz0l5dq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
app.use('/api/auth', userRoutes);
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



