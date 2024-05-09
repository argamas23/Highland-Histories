const express = require('express');

const {
  getArchiveById, 
  getArchives, 
  getMyUploads, 
  updateArchive, 
  deleteArchive, 
  uploadArchive,
  saveFile

} = require('../controllers/archiveController');

const upload = require('../utils/upload');

const router = express.Router();

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

// Route to get a single archive by ID
router.get('/:id', archiveController.getArchiveById);

// router.post('/upload' , uploadFile, savefile);
router.post('/upload', upload.single('file'), saveFile);
module.exports = router;
