const router = require('express').Router()
const User = require('../models/User')
//enables password encryption 
const bcrypt = require('bcrypt')

//REGISTER

//reaching from the auth.js route in the routes folder to the
//adding additional path here that reaches back to User mode in Users.js in models folder
router.post('/register', async (req,res) => {
    
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create new User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        //save User and return response 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err)
    }
});

//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).send('user not found')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    }
    catch(err) {
        res.status(500).json(err)
    } 
});

// s
module.exports = router