const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Album = require('../../models/Album');
const Photo = require('../../models/Photo');
require('dotenv').config();

router.use(cookieParser());

//Get albums by user id, or by cookies if user is logged in
router.get('/albums/:userId', async (req, res) => {

  var useUserId = req.params.userId;

    try {

      if (useUserId === '0') {
        const token = req.cookies.jwt;
        if (!token) {
          console.log('no token');
          return res.json('Please log in');
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) {
          console.log('invalid token');
          return res.json('Please log in');
        }
        useUserId = verified.id;
      }

      const user = await User.findById(useUserId);
      await Album.find({owner: user._id}).then(albums => res.json(albums))
      .then(console.log('sent albums to client'));
    
    } catch(err) {
        console.log(err);
        res.json(err);
    }
});

//Get images (metadata) in a user's album
router.get('/images/:userId/:albumId', async (req, res) => {

  var useUserId = req.params.userId;
  console.log(useUserId);
  var useAlbumId = req.params.albumId;

    try {

      if (useUserId === '0') {
        const token = req.cookies.jwt;
        if (!token) {
          console.log('no token');
          return res.json('Please log in');
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) {
          console.log('invalid token');
          return res.json('Please log in');
        }
        useUserId = verified.id;
      }

      const user = await User.findById(useUserId);
      const album = await Album.findById(useAlbumId);
      await Photo.find({owner: user._id, album: album._id}).then(images => res.json(images))
      .then(console.log('sent images to client'));
    
    } catch(err) {
        console.log(err);
        res.json(err);
    }
});


module.exports = router;