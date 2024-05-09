const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const express = require('express');
const cors = require('cors');

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



// PUT endpoint for updating file content or metadata
router.put('/api/archives/:id', upload.single('file'), async (req, res) => {
  try {
    const fileDoc = await File.findById(req.params.id);
    if (!fileDoc) {
      return res.status(404).send('File not found.');
    }

    // Check if there is a new file to replace the old one
    if (req.file) {
      // Update the file metadata with the new file's info
      fileDoc.filename = req.file.filename;
      fileDoc.contentType = req.file.mimetype;
      fileDoc.size = req.file.size;
      // Delete the old file from the filesystem
      fs.unlinkSync(fileDoc.path);
      // Update the path to the new file
      fileDoc.path = req.file.path;
    }

    // Add any other metadata updates here

    await fileDoc.save();

    res.json({ message: "File updated successfully", fileDoc });
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).send('Error updating file');
  }
});



router.delete('/api/archives/:id', async (req, res) => {
  try {
    const fileDoc = await File.findById(req.params.id);
    if (!fileDoc) {
      return res.status(404).send('File not found.');
    }

    // Delete the file from the filesystem or wherever it's stored
    await fs.promises.unlink(fileDoc.path);

    // Remove the file metadata from the database
    await fileDoc.remove();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send('Error deleting file');
  }
});

module.exports = router;