const router = require('express').Router();
const User = require('../../models/User');
const Album = require('../../models/Album');
const verify = require('./verify');

const { albumValidation } = require('../../validation');


// Create new album
router.post('/newAlbum', verify, async (req,res) => {

    //validate
    const { error } = albumValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //find user
    const userId = req.user._id;
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(400).send('User not found');

    //create album
    const album = new Album({
        owner: userId,
        name: req.body.name,
        description: req.body.description
    });
    try {
        const savedAlbum = await album.save();
        res.send({album: album.name});
    } catch(err) {
        res.status(400).send(err);
    }
});

// Upload image


module.exports = router;