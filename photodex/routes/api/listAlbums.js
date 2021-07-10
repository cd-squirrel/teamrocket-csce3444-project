const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Album = require('../../models/Album');
require('dotenv').config();

router.use(cookieParser());


router.get('/albums', async (req, res) => {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.json('Please log in');
      }
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verified) {
        return res.json('Please log in');
      }
      req.user = verified;
      const user = await User.findById(req.user.id);
      await Album.find({owner: user._id}).then(albums => res.json(albums))
      .then(console.log('sent albums to client'));
    
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;