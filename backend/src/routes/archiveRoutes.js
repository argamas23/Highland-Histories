const express = require('express');
const upload = require('../utils/upload');
const {
  getArchiveById,
  getArchivesByFeature,
  getUserUploads,
  updateArchive,
  deleteArchive,
  uploadArchive

} = require('../controllers/archiveController');

const router = express.Router();

// Get archive by ID
router.get('/:id', getArchiveById);

// Get archives by feature (this will be a query string)
router.get('/feature', getArchivesByFeature);

// Update an archive
router.put('/:id', updateArchive);

// Delete an archive
router.delete('/:id', deleteArchive);

//Upload an archive
router.post('/upload', upload.single('file'), uploadArchive);

// Get user uploads
router.get('/user/:userId/uploads', getUserUploads);

module.exports = router;
