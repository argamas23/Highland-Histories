const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
// const Request = require('../models/Request');  
const Request = require('../models/Request');


// Route to handle adding a new request
router.post('/add', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 3 }),
    body('usertype', 'Enter the correct user type').isString(),
    body('institute', 'Institute is required').not().isEmpty(),
    body('profession', 'Profession is required').not().isEmpty(),
    body('bio', 'Bio must be up to 200 characters').isLength({ max: 200 }),
    body('age', 'Valid age is required').isInt({ min: 1 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, usertype } = req.body;

    try {
        // Check if the email already exists in the Request collection
        const existingRequest = await Request.findOne({ email });
        if (existingRequest) {
            return res.status(400).json({ message: 'Email already exists' });
            
        }

        // Create a new request document
        const newRequest = new Request({
            name,
            email,
            password,
            usertype,
            institute: req.body.institute,
            profession: req.body.profession,
            bio: req.body.bio,
            age: req.body.age
        });

        // Save the document to the database
        const savedRequest = await newRequest.save();
        res.status(201).json({ message: 'Request added successfully', request: savedRequest });
    } catch (error) {
        console.error('Error adding request:', error);
        res.status(500).json({ message: 'Failed to add request', error });
    }
});

// Route to fetch all pending requests 
// router.get('/fetch', async (req, res) => {
//     try {
//       const requests = await Request.find({});
//       res.status(200).json({ requests });
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//       res.status(500).json({ message: 'Failed to fetch requests', error });
//     }
//   });

router.get('/fetch', async (req, res) => {
  try {
    let query = {};
    const requests = await Request.find(query);
    console.log("Request:", requests);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(requests));
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.setHeader('Content-Type', 'application/json');
    console.log('Headers:', res.getHeaders());
    res.status(500).json({ message: 'Failed to fetch requests', error });
  }
});

  router.delete('/delete/:id', async (req, res) => {
    try {
      const requestId = req.params.id;
      await Request.findByIdAndDelete(requestId);
      res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
      console.error('Error deleting request:', error);
      res.status(500).json({ message: 'Failed to delete request', error });
    }
  });
  

module.exports = router;