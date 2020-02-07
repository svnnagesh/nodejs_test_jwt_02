const express = require('express');
const router = express.Router();
const request = require('request');
const multer = require('multer');

function uploadFiles() {

    var fileStorage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "./uploads");
        },    
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    })

    var upload = multer({
        storage: fileStorage
    }).array("imgUploader", 3); //Fieldname and max count

}

module.exports = new uploadFiles()