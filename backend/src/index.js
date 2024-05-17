// const { MongoClient, ServerApiVersion } = require('mongodb');
// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/auth'); // Adjust the path as per your project structure
// const archiveRoutes = require('./routes/archiveRoutes');
// const app = express();
// const routes = require('./routes'); // Import routes

// // mongoose.connect("mongodb+srv://highlandhistoriesdeveloper:RvWKjUnNKacdWaX1@cluster0.pz0l5dq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

// // Middleware to parse request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/archives', archiveRoutes);

// const cors = require('cors');
// const bodyParser = require('body-parser');
// app.options('*', cors()); // Enable pre-flight across the board
// app.use(cors({
//   origin: 'http://localhost:3000', // or your specific allowed domain
//   methods: ['GET,POST,PUT,DELETE'],
//   credentials: true, // to support session cookies from the browser
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


// const mongoURI = "mongodb+srv://highlandhistoriesdeveloper:RvWKjUnNKacdWaX1@cluster0.pz0l5dq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Connect to MongoDB using Mongoose with additional options
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true, 
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
//   connectTimeoutMS: 30000, // Increase timeout to 30 seconds
//   socketTimeoutMS: 45000 // Increase socket timeout as well
// }).then(() => {
//   console.log('Successfully connected to MongoDB.');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// //Routes
// app.use('/',routes);
// app.use('/api/auth', userRoutes);
// app.use('/api/archives', archiveRoutes);



// app.get('/', (req, res) => {
//   res.send('Welcome to the Highland Histories Digital Archive System backend!');
// });


// // Start the server
// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });









const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/auth');
const archiveRoutes = require('./routes/archiveRoutes');

const app = express();

// Correct CORS configuration to ensure headers are set properly
app.use(cors({
  origin: 'http://localhost:3000', // This should match your front-end URL exactly
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Important to send cookies across domains
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
app.use('/api/archives', archiveRoutes);

// // Routes
// app.use('/api/auth', userRoutes);
// app.use('/api/archives', archiveRoutes);

// Serve static files from 'uploads' directory if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../frontend/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
      }
);

})

// MongoDB connection
const mongoURI = "mongodb+srv://highlandhistoriesdeveloper:RvWKjUnNKacdWaX1@cluster0.pz0l5dq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

  // Routes
app.use('/api/auth', userRoutes);
app.use('/api/archives', archiveRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
