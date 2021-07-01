const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   Post api/users
// @desc    Create a user
// @access  Public
router.post('/', async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      await newUser.save().then(user => res.json(user));
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;