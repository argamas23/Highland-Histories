const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },

    profession: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
        maxlength: 200
    },
    age: {
        type: Number,
        required: true
    }
    
    // Add any other fields you need for your request model
});

// Create Request model
const Request = mongoose.model('Request', userSchema);
Request.createIndexes();
// Export Request model
module.exports = Request;
