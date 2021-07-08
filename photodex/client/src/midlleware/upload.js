const express = require('express')
const multer = require("multer");

const app = express()

app.use(express.static('./photodex/client/public/uploads'))

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./photodex/client/public/uploads/");
  },
  filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

app.get('/', function(re,res){
  res.render('index.html');
})

app.post('/',(req,res) => {
  upload(req,res,function(err){
    if(err){
      console.log(err)
      return res.end("Something Went Wrong")
    }else{
      console.log(re.file.path)
    }
  })
})