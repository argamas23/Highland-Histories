// const express = require('express');
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// var jwt = require('jsonwebtoken');
// var fetchuser = require('../middleware/fetchuser');
// const JWT_SECRET = 'your_secret_key';


// //ROUTE1: Create a User using: POST "/api/auth/createuser". No login required
// router.post('/createuser', [
//     body('name', 'Enter a Valid Name').isLength({ min: 3 }),
//     body('email', 'Enter a Valid email').isEmail(),
//     body('password', 'Enter a valid password').isLength({ min: 3 }),
// ], async (req, res) => {
//     try {
//         // If there are errors, return Bad request and errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             success = false;
//             return res.status(400).json({success, errors: errors.array() });
//         }

//         // Check whether the user already exists
//         let user = await User.findOne({ email: req.body.email });
//         if (user) {
//             success = false;
//             return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
//         }
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);
//         // Create the user
//         user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: secPass,
//         });
//         const data = {
//             user:{
//                 id: user.id
//             }
//         }
//         const authtoken = jwt.sign(data, JWT_SECRET);
        
//         success = true
//         res.json({success, authtoken});
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });


// //ROUTE2: Authenticate a user using POST "/api/auth/login". No login required

// router.post('/login', [
//     body('email', 'Enter a Valid email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
// ], async (req, res) => {
//     // If there are errors, return Bad request and errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         success = false;
//         return res.status(400).json({success,errors: errors.array() });
//     }
//     const {email, password} = req.body;
//     try{
//         let user = await User.findOne({email});
//         if(!user){
//             success = false;
//             return res.status(400).json({success, error: "Please try to login with correct credentials"});
//         }
//         const passwordCompare = await bcrypt.compare(password, user.password);
//         if (!passwordCompare){
//             success = false;
//             return res.status(400).json({success, error: "Please try to login with correct credentials"});
//         }
//         const data = {
//             user:{
//                 id: user.id
//             }
//         }
//         const authtoken = jwt.sign(data, JWT_SECRET);
//         success = true;
//         res.json({success, authtoken})
//     }
//     catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// }
// );

// //ROUTE3: Get loggedin User Details using: POST "/api/aut/getuser". Login required
// router.post('/getuser', fetchuser, async (req, res) => {
//     try{
//         userId = req.user.id;
//         const user = await User.findById(userId).select("-password");
//         res.send(user)
//     }catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// })
// module.exports = router;

const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'your_secret_key';


//ROUTE1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 3 }),
    body('usertype','Enter the correct secret key').isString(),
    body('institute', 'Institute is required').not().isEmpty(),
    body('profession', 'Profession is required').not().isEmpty(),
    body('bio', 'Bio must be up to 200 characters').isLength({ max: 200 }),
    body('age', 'Valid age is required').isInt({ min: 1 })
], async (req, res) => {
    try {
        // If there are errors, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({success, errors: errors.array() });
        }

        // Check whether the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create the user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            usertype: req.body.usertype,
            institute: req.body.institute,
            profession: req.body.profession,
            bio: req.body.bio,
            age: req.body.age
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        success = true
        // res.json({success, authtoken});
        res.json({ success, authtoken, userId: user.id });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//ROUTE2: Authenticate a user using POST "/api/auth/login". No login required


router.post('/login', [
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    body('usertype', 'Please Select a User Type').isString(),
], async (req, res) => {
    // If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, usertype } = req.body;
    try {
        // Query the user from the database including the 'usertype' field
        let user = await User.findOne({ email, usertype});
        
        if (!user) {
            
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }
        
        const data = {
            user: {
                id: user.id
            }
        };
        
        const authtoken = jwt.sign(data, JWT_SECRET);
// <<<<<<< HEAD
        success = true;
        // res.json({success, authtoken})
        res.json({ success, authtoken, userId: user.id, usertype: user.usertype });

    }
    catch (error) {
// =======
        
        // Return success along with authtoken and usertype
    //     res.json({ success: true, authtoken, usertype: user.usertype });
    // } catch (error) {
// >>>>>>> stash
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



//ROUTE3: Get loggedin User Details using: POST "/api/aut/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;
