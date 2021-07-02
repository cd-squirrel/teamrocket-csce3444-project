const router = require('express').Router();
const User = require('../../models/User');
const verify = require('./verify');


// allow user to see their albums/posts
router.get('/', verify, (req,res) => {
    User.findOne({_id: req.user});

    //placeholder
    res.json({
        posts: {
            title: 'my first post', 
            description: 'blah blah blah the usual'}});
});

module.exports = router;