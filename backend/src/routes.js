// backend/routes.js or backend/index.js

const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const express = require('express');
const router = express.Router();

// src/Utils to upload
const upload = require('./utils/upload.js');

// src/models to import
const File = require('./models/File'); // Adjust the path according to your project structure

// // Middleware to handle the file upload and response for local storage
const handleFileUpload = upload.single('file');


const saveFileDocument = async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    // Create a new file document based on the uploaded file
  const fileDoc = new File({
    filename: req.file.filename,
    path: req.file.path,
    contentType: req.file.mimetype,
    size: req.file.size
  });

  try {
    // Save the file document in MongoDB
    await fileDoc.save();
    req.fileDoc = fileDoc; // Pass this along to the next middleware
    next();
  } catch (error) {
    console.error('Error saving file information to MongoDB:', error);
    console.log('Error saving file information to MongoDB:', error);
    res.status(500).send('Error saving file information to MongoDB');
  }
};

const respondSuccess = (req, res) => {
    // Respond with success message and file details
    res.json({
      message: "File uploaded and saved to MongoDB successfully",
      fileDetails: {
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype,
        size: req.file.size
      }
    });
  };

// POST endpoint for file upload
router.post('/api/archives/upload', handleFileUpload, saveFileDocument, respondSuccess);

// // POST endpoint for file upload
// router.post('/api/archives/upload', upload.single('file'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     // Create a new file document
//     const fileDoc = new File({
//         filename: req.file.filename,
//         path: req.file.path, // GridFS storage path
//         contentType: req.file.mimetype,
//         size: req.file.size,
//         gridFsFileId: req.file.id, // Assuming you want to store the GridFS file ID
//         bucketName: 'uploads'
//     });

//     try {
//         // Save the file document in MongoDB
//         await fileDoc.save();
//         res.json({
//             message: "File uploaded and saved to MongoDB successfully",
//             fileDetails: {
//                 filename: req.file.filename,
//                 mongoGridFsId: req.file.id
//             }
//         });
//     } catch (error) {
//         console.error('Error saving file information to MongoDB:', error);
//         res.status(500).send('Error saving file information to MongoDB');
//     }
// });



module.exports = router;