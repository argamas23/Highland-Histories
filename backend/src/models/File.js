// // models/File.js
// //@Author - @AishaniPandey

// const mongoose = require('mongoose');

// const fileSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   path: { type: String, required: true },
//   contentType: { type: String, required: true },
//   size: { type: Number, required: true },
//   uploadDate: { type: Date, default: Date.now }
// });

// const File = mongoose.model('File', fileSchema);

// module.exports = File;

// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true }, // Local path if still needed
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now }
//   gridFsFileId: mongoose.Schema.Types.ObjectId, // Stores the GridFS file _id
//   bucketName: { type: String, required: true, default: 'uploads' } // GridFS bucket name
});

const File = mongoose.model('File', fileSchema);

module.exports = File;