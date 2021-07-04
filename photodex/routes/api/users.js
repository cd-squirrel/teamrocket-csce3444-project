const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
    try {
      await User.find()
        .sort({ date: 1})
        .then(users => res.json(users))
    } catch(err) {
        console.log(err);
    }
});


// Needs verification, delete albums and photos
// @route   Delete api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        await User.findById(req.params.id)
          .then(user => user.remove().then(() => res.json({ success: true})))
    } catch(err) {
        res.status(404).json({ success: false});
    } 
});


module.exports = router;