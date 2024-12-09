const express = require('express');
const Archive = require('../models/Archive');
// const upload = require('../utils/upload');
const {multipleUpload} = require('../utils/upload');
const router = express.Router();

const {
  getArchiveById, 
  getArchives, 
  getMyUploads, 
  updateArchive, 
  deleteArchive, 
  uploadArchive,
  saveFile

} = require('../controllers/archiveController');

const archiveController = require('../controllers/archiveController');

// Get archive by ID
// router.get('/:id', getArchiveById);

// Get archives by feature (this will be a query string)
router.get('/', getArchives);

// Update an archive
router.put('/:id', updateArchive);

// Delete an archive
router.delete('/:id', deleteArchive);

//Upload an archive
// router.post('/upload', upload.single('file'), uploadArchive);

// Get user uploads
// router.get('/user/:userId/uploads', getUserUploads);
router.get('/my-uploads', getMyUploads);

// // Get user uploads
// //
// router.get('/user/:userId/uploads', archiveController.getMyUploads);

// GET endpoint for fetching user uploads by user ID
router.get('/user/:userId/uploads', async (req, res) => {
    console.log("Hi from backend: archiveRoutes.js: I am in the GET endpoint for fetching user uploads");
    try {
        const userId = req.params.userId;
        console.log("Requested User ID for uploads:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const uploads = await archiveController.getMyUploads(req); // Assuming this function handles the logic correctly
        console.log("Uploads fetched for User ID:", userId, " Uploads:", uploads);

        res.status(200).json(uploads);
    } catch (error) {
        console.error('Error fetching user uploads:', error);
        res.status(500).json({ error: "Error fetching user uploads; Error Originates from archiveRoutes.js in the backend", message: error.message });
    }
});



// Route to get a single archive by ID
router.get('/:id', archiveController.getArchiveById);

// router.post('/upload' , uploadFile, savefile);
// router.post('/upload', upload.single('file'), saveFile);

// POST endpoint for uploading an archive
router.post('/upload', multipleUpload, async (req, res) => {
    console.log("Received fields:", req.body); // Log text field values
    console.log("Files received:", req.files); // Log file details

    try {
        console.log("Hi from backend: archiveRoutes.js: POST endpoint for uploading an archive");

        let { 
            title, 
            caption, 
            categories, 
            description, 
            date, 
            location, 
            userId, 
            url, 
            section, 
            eventType, 
            interviewer, 
            interviewee,
            mapType, 
        } = req.body;

        const file = req.files?.file?.[0]; // Safely access the uploaded file
        const thumbnailFile = req.files?.thumbnail?.[0]; // Safely access the uploaded thumbnail
        console.log(interviewee, interviewer);
        // Parse JSON fields with fallback to empty arrays if they are missing or invalid
        try {
            categories = categories ? JSON.parse(categories) : [];
        } catch (err) {
            console.error("Error parsing 'categories':", err);
            categories = [];
        }

        try {
            interviewer = interviewer ? JSON.parse(interviewer) : [];
        } catch (err) {
            console.error("Error parsing 'interviewers':", err);
            interviewer = [];
        }

        try {
            interviewee = interviewee ? JSON.parse(interviewee) : [];
        } catch (err) {
            console.error("Error parsing 'interviewees':", err);
            interviewee = [];
        }

        if (!file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // Modify `url` if it ends with "undefined"
        if (url.endsWith("uploads/undefined")) {
            url = url.replace("uploads/undefined", "uploads/" + file.filename);
        }

        // Construct thumbnail URL if thumbnail is provided
        let thumbnailUrl = null;
        if (thumbnailFile) {
            thumbnailUrl = `https://highlandhistories.org/uploads/${thumbnailFile.filename}`;
        }

        // Save the archive
        const newArchive = new Archive({
            userId,
            title,
            caption,
            categories,
            description,
            date,
            location,
            url,
            filename: file.filename,
            filePath: file.path,
            fileType: file.mimetype,
            section,
            eventType,
            interviewer,
            interviewee,
            thumbnail: thumbnailUrl,
            mapType,
        });

        const savedArchive = await newArchive.save();
        res.status(201).json({ message: "File uploaded successfully", data: savedArchive });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: "Error uploading file", message: error.message });
    }
});




// Additional routes for archives
router.get('/', async (req, res) => {
    try {
        const archives = await Archive.find({});
        res.status(200).json(archives);
    } catch (error) {
        res.status(500).json({ message: "Error fetching archives", error: error.message });
    }
});

// New endpoint to fetch archives by section
router.get('/', (req, res) => {
    const { section } = req.query; // Capture 'section' from query parameters
    // Construct a query object based on whether 'section' is provided
    let query = section ? { section } : {};
    
    Archive.find(query)
        .then(archives => res.json(archives))
        .catch(err => res.status(500).json({ message: "Error fetching archives", error: err.message }));
});

//Fetch archives by Eventtype
router.get('/', (req, res) => {
    const { eventType } = req.query; 
    let query = eventType ? { eventType } : {};
    
    Archive.find(query)
        .then(archives => res.json(archives))
        .catch(err => res.status(500).json({ message: "Error fetching archives", error: err.message }));
});

module.exports = router;
