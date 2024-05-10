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
    }
    
    // Add any other fields you need for your user model
});

// Create User model
const User = mongoose.model('User', userSchema);
User.createIndexes();
// Export User model
module.exports = User;
