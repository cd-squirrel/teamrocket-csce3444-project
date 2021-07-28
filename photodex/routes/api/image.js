const router = require('express').Router();
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { albumValidation } = require('../../validation');

//models
const User = require('../../models/User');
const Album = require('../../models/Album');
const Photo = require('../../models/Photo');

// middleware
router.use(cookieParser());

//Credit: Thomas Foydel for most of the image upload code
//github repo: ThomasFoydel/MERN-image-upload

// Connecting to mongodb
const mongoURI = process.env.DB_CONNECTION;
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Creating GridFS storage for images, unique file names
let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images',
    });
});

const storage = new GridFsStorage({
    url: mongoURI,
    options: {useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});

// Multer: limiting file size and calling checkFileType function
const store = multer({
    storage,
    limits: {fileSize: 20000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
});

//Check file types
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = filetypes.test(file.mimetype);
    if(mimeType && extname) return cb(null, true);
    cb('filetype');
}

//uploading middleware, catch file errors
const uploadMiddleware = (req, res, next) => {
    const upload = store.single('image');
    upload(req, res, function(err){
        if(err instanceof multer.MulterError){
            return res.status(400).send('File too large');
        } else if (err) {
            if (err == 'filetype') return res.status(400).send('Image files only');
            return res.status(500);
        };
        //console.log('did upload middleware');
        next();
    });
};

//image upload route
router.post('/upload/', uploadMiddleware, async (req, res) => {
    const {file} = req;
    const {id} = file;
    
    const albumId = req.body.albumid;
    console.log(req.body);
    if (albumId === null) {
        return res.json('albumId = null')};

    
    var user = {};

    if (file.size > 5000000) {
        deleteImage(id);
        return res.status(400).json('File may not exceed 5 mb');
    }
    console.log('uploaded file');

    try {
        const token = req.cookies.jwt;
        if (!token) {
          return res.json('Please log in');
        }
        console.log('checked cookie');
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) {
          return res.json('Please log in');
        }
        console.log('checked jwt');
        user_id = verified;
        console.log(user_id);
        user = await User.findById(user_id.id);
        console.log('valid user');

    } catch(err) {
        console.log(err);
        return res.json('caught error: ', err);
    }

    console.log('album id: ', albumId);
    const photo = new Photo({
        owner: user._id,
        album: albumId,
        fileId: id
    });
    console.log('init Photo');

    try {
        const savedImage = await photo.save();
        console.log('saved photo');

    } catch(err) {
        console.log(err);
        return res.json(err);
    }
    res.json('uploaded image');
});

//delete image
const deleteImage = id => {
    if (!id || id == 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, err => {
        if (err) return res.status(500).send('image deletion error');
    })
};

//route for retrieving image
router.get('/:id', ({ params: { id } }, res) => {
    if(!id || id == 'undefined') return res.status(400).send('No image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.find({_id}).toArray((err, files) => {
        if (!files || files.length == 0) 
          return res.status(400).send('No files exist');
        gfs.openDownloadStream(_id).pipe(res);
    });
});

// Create new album
router.post('/newAlbum', async (req,res) => {

    //validate
    const { error } = albumValidation(req.body);
    if(error) return res.status(400).send('must have album title');
    
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

        //create album
        const album = new Album({
            owner: user._id,
            name: req.body.name,
            description: req.body.description
        });

        const savedAlbum = await album.save();
        res.json({album: album.name})
      
      } catch(err) {
          console.status(400).send(err);
      }
});

module.exports = router;