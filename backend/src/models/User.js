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
    institute: {    // Added field
        type: String,
        required: true
    },
    profession: {   // Added field
        type: String,
        required: true
    },
    bio: {          // Added field
        type: String,
        required: true
    },
    age: {          // Added field
        type: Number,
        required: true
    }
    
  
});

// Create User model
const User = mongoose.model('User', userSchema);
User.createIndexes();
// Export User model
module.exports = User;
