const express = require('express')
const multer = require("multer");

const app = express()

app.use(express.static('./client/public/uploads'))

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/");
  },
  filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");