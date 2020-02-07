const express = require('express');
const router = express.Router();
const dbCall = require('./dbcall.js');
const multer = require('multer');
const fs = require('fs');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir: './uploads' });


router.get('/', (req, res) => {
    res.send(one('Get data from things route.'));
})

router.get('/testRouting', (req, res) => {
    res.send('test routing');
})

router.post('/new', (req, res) => {
    if(!req.body.name) {
        res.json({"message":"Please provide name"})
    } else {
        res.send(one());
    }
})


/* var fileStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log('destination::::');
        console.log(file);
        callback(null, "./uploads");
    },    
    filename: function(req, file, callback) {
        console.log('filename::::');
        console.log(file);
        callback(null, file.fieldname + path.extname(file.originalname));
    }
})

var uploadFilesToDrive = multer({
    storage: fileStorage
}).any(); //Fieldname and max count

router.post('/fileUploads', (req, res)=> {
    uploadFilesToDrive(req, res, function(resp, stat) {
        var reqFile = req.files[0]
        var strImgPath = __dirname + "/uploads/" + reqFile.fieldname + "." + (path.extname(reqFile.originalname)).split('.').pop();
        console.log('filesUpload::::>>>>', reqFile)
         if (stat) {
             fs.unlinkSync(strImgPath);
             res.json({ "status":"Ok", "message": "File uploaded sucessfully!.", data: resp })
         } else {
             res.json({ "status":"NotOk", "message": "Something went wrong!" })
         }
     });
}) */

function one() {
   //return name;     
   var name = "Nagesh"
   console.log(name)
}

module.exports = router;