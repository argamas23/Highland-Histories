const express = require('express');
const {
  getArchiveById,
  getArchivesByFeature,
  updateArchive,
  deleteArchive
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

module.exports = router;
