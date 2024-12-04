const express = require('express');
const Archive = require('../models/Archive');
const upload = require('../utils/upload');
const router = express.Router();
const { exec } = require('child_process');

const {
  getArchiveById, 
  getArchives, 
  getMyUploads, 
  updateArchive, 
  deleteArchive, 
  uploadArchive,
  saveFile

} = require('../controllers/archiveController');

// const upload = require('../utils/upload');

// const router = express.Router();

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

        const uploads = await archiveController.getMyUploads(req); 
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
router.post('/upload', upload.single('file'), async (req, res) => {

    console.log("Received fields:", req.body); // Log text field values
    console.log(req.file); // Log file details
    try {
        console.log ("Hi from backend : archiveRoutes.js : I am in the POST endpoint for uploading an archive")
        let { title, caption, categories, description, date, location,userId, url , section, eventType } = req.body;
        const file = req.file;
        //debugging 
        console.log("Request Body Recieved from frontend to backend is : "  , req.body, "Consisting of - 'Title' = ", title, " Caption : ",  caption, "Categories : ", categories,"Description :", description,"Date : ", date,"Location : ", location, "UserID : " , userId, "URL :", url, " file : " , file)


        // Construct the URL
        // const fileUrl = `http://43.204.23.49/uploads/${file.filename}`;
        
        // If url ends with "undefined", remove it, and replace with content of file.filename
        if (url.endsWith("uploads/undefined")) {
            url = url.replace ("uploads/undefined","uploads/"+file.filename);
            // url = url.replace("uploads/undefined", file.filename);
        }

        // If url ends with "undefined", construct the correct URL
        // if (!url || url.endsWith("uploads/undefined")) {
        //     url = `http://43.204.23.49/uploads/${file.filename}`;
        // }

        if (!file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // let { url } = req.body;
//   let filepath = req.file.path;
//   let fileType = req.file.mimetype;
//   let filename = req.file.filename;

//   if (req.file.mimetype === 'video/x-matroska') {
//     const oldPath = filepath;
//     const newPath = oldPath.replace('.mkv', '.mp4');

//     // Convert MKV to MP4 using ffmpeg
//     try {
//       await new Promise((resolve, reject) => {
//         const ffmpegCommand = `ffmpeg -i "${oldPath}" "${newPath}" -hide_banner -loglevel error`;
//         exec(ffmpegCommand, (error, stdout, stderr) => {
//           if (error) {
//             console.error('Conversion error:', stderr);
//             reject(error);
//           }
//           resolve(stdout);
//         });
//       });

//       // Update file path and mime type
//       filepath = newPath;
//       fileType = 'video/mp4';
//       filename = filename.replace('.mkv', '.mp4');
//       url = url.replace('.mkv', '.mp4');  // Update URL if needed

//       // Optionally delete the original MKV file
//       fs.unlinkSync(oldPath);
//     } catch (error) {
//       return res.status(500).json({ message: 'Error converting video file.', error: error.message });
//     }
//   }

        const newArchive = new Archive({
            userId,
            title,
            caption,
            categories: JSON.parse(categories),
            // categories: categories.split(','),  // Assuming categories are sent as comma-separated
            description,
            date,
            location,
            url,
            filename: file.filename,
            filePath: file.path,
            fileType: file.mimetype,
            section,
            eventType
        });

        const savedArchive = await newArchive.save();
        res.status(201).json({ message: "File uploaded successfully", data: savedArchive });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: "Error uploading file; Error Originates from archiveRoutes.js in the backend", message: error.message });
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
