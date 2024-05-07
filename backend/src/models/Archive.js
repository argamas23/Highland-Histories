const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    categories: {
        type: [String]
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    filename: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
