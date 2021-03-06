const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv/config');

const User = require('../../models/User');
const { registerValidation, loginValidation } = require('../../validation');

// middleware
router.use(cookieParser());

// function: create json webtoken
const maxAge = 86400; //1 day in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};

// Register
router.post('/register', async (req, res) => {

    //validate
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    //check if username exists
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).json('username already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({login: true});
    } catch(err) {
        res.status(400).json({err});
    }
});

// Login
router.post('/login', async (req, res) => {

    //validate
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message); 

    //check if username exists
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(400).json('username not found');

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json('invalid password');

    //create and assign token
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({login: true});

    //res.send('Logged in!');
    res.end();

})

// Logout
router.get('/logout', (req, res) => {

    //create and send cookie expiring in 1 ms
    //then redirect to homepage
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
});

module.exports = router;