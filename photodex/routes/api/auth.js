const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { registerValidation, loginValidation } = require('../../validation');

// Register
router.post('/register', async (req, res) => {

    //validate
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if username exists
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).send('Username taken');

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
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {

    //validate
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if username exists
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(400).send('Username not found');

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Logged in!');

})

// Delete user

module.exports = router;