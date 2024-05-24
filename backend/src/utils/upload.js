const express = require ('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// import multer, { diskStorage } from 'multer';

const uploadDirectory = path.join(__dirname, '..', 'uploads'); 

// Ensure upload directory exists
fs.mkdirSync(uploadDirectory, { recursive: true });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, 'uploads/');
//     cb(null, uploadDirectory);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadDirectory);
      // cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application') ||
      file.mimetype.startsWith('audio') || file.mimetype.startsWith('video')) {
      cb(null, true);
  } else {
      cb(new Error('Not supported file type!'), false);
  }
};

const upload = multer({ storage: storage,
  fileFilter: fileFilter,
  limits: {
      fileSize: 10 * 1024 * 1024 * 1024 //10 GB

  }

});

module.exports = upload;

