const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null,  path.join(__dirname, '../uploads/vehicles'));
  },
  filename: (req, file, cb) => {
    console.log(file);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    req.body.image = file.fieldname + '-' + Date.now()+ '.' +extension
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("image");

module.exports = uploadFile;