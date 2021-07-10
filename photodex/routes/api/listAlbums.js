const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Album = require('../../models/Album');

// Get list of albums by user
router.get('/albums', async (req, res) => {
    try {
      //check if username exists
      const user = await User.findOne({ username: req.body.username });
      if(!user) return res.status(400).json('username not found');

      //now get list of albums
      await Album.find({ owner: user._id })
        .sort({ date: 1})
        .then(albums => res.json(albums))
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;