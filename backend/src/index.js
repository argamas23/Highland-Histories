const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/auth');
const archiveRoutes = require('./routes/archiveRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();

// Correct CORS configuration to ensure headers are set properly
app.use(cors({
  origin: 'https://highlandhistories.org', // This should match your front-end URL exactly
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Important to send cookies across domains
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global middleware
app.use(express.json({limit: '10gb'}));
app.use(express.urlencoded({ extended: true , limit: '10gb' }));
// app.use('/uploads', express.static('uploads'));
app.use('/api/archives', archiveRoutes);

// // Routes
// app.use('/api/auth', userRoutes);
// app.use('/api/archives', archiveRoutes);

// Serve static files from 'uploads' directory if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../frontend/build");
// const buildPath = path.join(__dirname, '../frontend/build');



app.use(express.static(buildPath))

app.get("/*", function(req, res)
// app.get('*', (req, res) => 
{

    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
      }
);

})

// app.get('*', (req, res) => {
//   const indexPath = path.join(__dirname, "../frontend/build/index.html");
//   console.log(`Serving index.html from: ${indexPath}`);
//   res.sendFile(indexPath, function (err) {
//     if (err) {
//       console.error('Error serving index.html:', err);
//       res.status(500).send(err);
//     }
//   });
// });



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
app.use('/api/requests', requestRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
