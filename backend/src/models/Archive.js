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
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fileType: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: [true, "URL is required"]
    },
    section: { 
        type: String, 
        required: true 
    },
    eventType: {
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: false
    },
    interviewer: {
        type: [String],
        required: false
    },
    interviewee: {
        type: [String],
        required: false
    },
    mapType: {
        type: String,
        required: false
    }
    
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
