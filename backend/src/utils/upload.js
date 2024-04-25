// backend/upload.js

const express = require ('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// import multer, { diskStorage } from 'multer';

const uploadDirectory = path.join(__dirname, '..', 'uploads'); // Adjust the path as needed

// Ensure upload directory exists
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

// // backend/utils/upload.js

// const multer = require('multer');
// const path = require('path');
// // const GridFsStorage = require('multer-gridfs-storage');
// const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const crypto = require('crypto'); // For generating file names
// const config = require('../config'); // Assume you have a config file for storing such details

// // MongoDB URI
// const mongoURI = config.mongoURI; 

// // const storage = new GridFsStorage({
// //     url: mongoURI,
// //     options: { useNewUrlParser: true, useUnifiedTopology: true },
// //     file: (req, file) => {
// //         return new Promise((resolve, reject) => {
// //             crypto.randomBytes(16, (err, buf) => {
// //                 if (err) {
// //                     return reject(err);
// //                 }
// //                 const filename = buf.toString('hex') + path.extname(file.originalname);
// //                 const fileInfo = {
// //                     filename: filename,
// //                     bucketName: 'uploads' // This is the name of the GridFS bucket.
// //                 };
// //                 resolve(fileInfo);
// //             });
// //         });
// //     }
// // });

// const storage = new GridFsStorage({
//     url: mongoURI,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         const filename = `file-${Date.now()}-${file.originalname}`;
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     }
//   });


// const upload = multer({ storage });

// module.exports = upload;
