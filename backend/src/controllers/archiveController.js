const Archive = require('../models/Archive');

const multer = require('multer');
const path = require('path');

// const Archive = require('../models/Archive');
const upload = require('../utils/upload'); // Import the Multer configuration

// exports.uploadFile = upload.single('file'); // Middleware for route to handle file uploads

exports.saveFile = async (req, res) => {
    const { title, description, categories, location, date, userId, interviewer, interviewee } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const newArchive = new Archive({
        userId,
        title,
        caption: req.body.caption,
        categories: JSON.parse(categories),
        description,
        date,
        location,
        filename: file.filename,
        url: req.body.url,
        fileType: file.mimetype,
        section: req.body.section,
        eventType: req.body.eventType,
        interviewer: JSON.parse(interviewer), // Parse JSON for interviewer
        interviewee: JSON.parse(interviewee), // Parse JSON for interviewee
        mapType: req.body.mapType,
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
      console.log('Archive URL:', archive.url);
      res.json(archive);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};




exports.uploadArchive = async (req, res) => {
    const { section, eventType, interviewer, interviewee } = req.body;

    console.log("Section received:", section);
    console.log("EventType received:", eventType);
    console.log("Interviewer received:", interviewer);
    console.log("Interviewee received:", interviewee);

    const thumbnail = req.body.thumbnail;

    try {
        const newArchive = new Archive({
            userId: req.body.userId,
            title: req.body.title,
            caption: req.body.caption,
            categories: JSON.parse(req.body.categories),
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            filename: req.file.filename,
            fileType: req.file.mimetype,
            section,
            eventType,
            interviewer: JSON.parse(req.body.interviewer), // Parse JSON for interviewer
            interviewee: JSON.parse(req.body.interviewee), // Parse JSON for interviewee
            thumbnail,
            mapType,
        });

        const savedArchive = await newArchive.save();
        res.json({ message: "File uploaded successfully", filename: req.file.filename, archive: savedArchive });
    } catch (error) {
        console.error("Error saving file:", error);
        res.status(500).json({ message: error.message });
    }
};


  


exports.getArchives = async (req, res) => {
    const { section, eventType, interviewer, interviewee } = req.query;

    try {
        let query = {};
        if (section && section !== 'All') query.section = section;
        if (eventType && eventType !== 'All') query.eventType = eventType;
        if (interviewer) query.interviewer = { $in: [interviewer] }; // Match array elements
        if (interviewee) query.interviewee = { $in: [interviewee] }; // Match array elements

        const archives = await Archive.find(query);
        res.json(archives);
    } catch (error) {
        res.status(500).send("Error fetching archives: " + error.message);
    }
};

  


exports.getMyUploads = async (req) => {
    try {
        const userId = req.params.userId;
        console.log("Fetching uploads for User ID:", userId);

        const uploads = await Archive.find({ userId: userId });
        console.log("Found uploads:", uploads.length);

        return uploads; // Return the uploads to be handled by the route
    } catch (error) {
        console.error("Error in getMyUploads function:", error);
        throw error; // Rethrow the error to be caught by the route
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
    const { id } = req.params;  // Destructure the ID for clarity and convenience

    if (!id) {
        return res.status(400).json({ message: "Archive ID is required." });
    }

    try {
        const archive = await Archive.findById(id);
        if (!archive) {
            return res.status(404).json({ message: `Archive with id ${id} not found.` });
        }

        await Archive.findOneAndDelete({ _id: id });
        res.json({ message: `Archive with id ${id} successfully deleted.` });
    } catch (error) {
        console.error(`Error deleting archive with id ${id}:`, error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};