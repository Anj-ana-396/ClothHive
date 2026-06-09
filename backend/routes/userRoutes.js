const express = require("express");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware.js")



const router = express.Router();







//  POST/api/users/register....here we will use /register...and append /api/users from server file
//   to Register a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;


    try {
        let user = await User.findOne({ email });// checkimg if user is already regisetered or not

        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password });// create new user if email does not ecist
        await user.save();

        //create JWT payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;

                // Send the user and token in response
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                })
            }
        )



    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});



// @route POST/api/users/login
// to Authenticate user
// Public access
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

        //create JWT payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;

                // Send the user and token in response
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                })
            }
        )



    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
     }

});





// @route GET /api/users/profile
// to Get logged-in user's profile (Protected Route)
//  Private access

router.get("/profile", protect,  async (req, res) => {
res.json(req.user);
});



module.exports = router