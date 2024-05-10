const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },

    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required:true,
    },
    location: {
        type: String,
        required:true,
    },
    filename: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        required: [true, "URL is required"]
    },
    
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
