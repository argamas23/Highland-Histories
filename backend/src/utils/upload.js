const express = require ('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// import multer, { diskStorage } from 'multer';

const uploadDirectory = path.join(__dirname, '..', 'uploads'); 

// Ensure upload directory exists
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'uploads/');
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

