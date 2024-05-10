const Archive = require('../models/Archive');

const multer = require('multer');
const path = require('path');

// const Archive = require('../models/Archive');
const upload = require('../utils/upload'); // Import the Multer configuration

exports.uploadFile = upload.single('file'); // Middleware for route to handle file uploads

exports.saveFile = async (req, res) => {
  const { title, description, categories, location, date, userId } = req.body;
  const file = req.file;

  if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
  }

  const newArchive = new Archive({
      // userId,
      // title,
      // description,
      // categories: JSON.parse(categories),
      // location,
      // date,
      // filePath: file.path,
      // fileType: file.mimetype
      userId: req.body.userId,
      title: req.body.title,
      caption: req.body.caption,
      categories: JSON.parse(req.body.categories),
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      // filename: req.file ? req.file.filename : '',
      filename: req.file.filename,
      url: req.body.url,
    });

  try {
      const savedArchive = await newArchive.save();
      res.status(201).json({ message: "File uploaded successfully", data: savedArchive });
  } catch (error) {
      res.status(500).json({ error: "Error saving file", message: error.message });
  }
};



exports.getArchiveById = async (req, res) => {
  try {
      const archive = await Archive.findById(req.params.id);
      if (!archive) {
          return res.status(404).json({ message: 'Archive not found' });
      }
      res.json(archive);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


  exports.uploadArchive = async (req, res) => {
    try {
        
        const newArchive = new Archive({
            userId: req.body.userId,
            title: req.body.title,
            caption: req.body.caption,
            categories: JSON.parse(req.body.categories),
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            filename: req.file.filename
        });
    //     await archive.save();
    //     res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    // } catch (error) {
    //     res.status(500).json({ message: 'File upload failed', error });
    // }
    const savedArchive = await newArchive.save();
        res.json({ message: "File uploaded successfully", filename: req.file.filename, archive: savedArchive });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
exports.getArchives = async (req, res) => {
  try {
      const archives = await Archive.find({});
      res.json(archives);
  } catch (error) {
      res.status(500).send("Error fetching archives");
  }
};
  
exports.getMyUploads = async (req, res) => {
  try {
      // Replace with actual user ID
      const userId = "testUserId"; 
      const uploads = await Archive.find({ userId: userId });
      res.json(uploads);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


exports.updateArchive = async (req, res) => {
  try {
      const updatedArchive = await Archive.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!updatedArchive) {
          return res.status(404).send('Archive not found');
      }
      res.json(updatedArchive);
  } catch (error) {
      res.status(500).send("Error updating archive: " + error.message);
  }
};

exports.deleteArchive = async (req, res) => {
    try {
        await Archive.findByIdAndRemove(req.params.id);
        res.json({ message: `Archive with id ${req.params.id} deleted.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
  