// Define a middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    // Check if user has admin permission based on usertype in request body
    if (req.body.usertype === "Admin") {
        // If the user is an admin, set isAdmin property in request object and proceed to the next middleware or route handler
        req.isAdmin = true;
        next();
    } else {
        // If the user is not an admin, set isAdmin property in request object to false
        req.isAdmin = false;
        return res.status(403).json({ error: "You don't have permission to perform this action" });
    }
};

// Route for user registration
// router.post('/createuser', [
//     body('name', 'Enter a Valid Name').isLength({ min: 3 }),
//     body('email', 'Enter a Valid email').isEmail(),
//     body('password', 'Enter a valid password').isLength({ min: 3 }),
//     body('usertype','Enter the correct secret key').isString()
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

//         // Create the user with pending status
//         user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             usertype: req.body.usertype,
//             status: 'pending' // Add a status field to track user approval status
//         });
        
//         success = true
//         res.json({success, message: "User registration request submitted for approval"});
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

// Route for admin to approve user registration
router.put('/approveuser/:userId', isAdmin, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by userId
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user's status to approved
        user.status = 'approved';
        await user.save();

        res.json({ success: true, message: "User registration approved" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Route for admin to reject user registration
router.put('/rejectuser/:userId', isAdmin, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by userId
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the user from the database
        await user.remove();

        res.json({ success: true, message: "User registration rejected" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
