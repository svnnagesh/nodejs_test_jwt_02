const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const router = express.Router();

let User = require('../models/user').userSchema;
let Farmer = require('../models/user').farmerSchema;


router.post('/addUser', function(req, res) {
    let user = new User(req.body);
    
    if(!req.body.firstName) {
        res.json({ "message": "First Name is required" })
    } else if(!req.body.lastName) {
        res.json({ "message": "Last Name is required" })
    } else if(!req.body.email) {
        res.json({ "message": "Email is required" })
    } else if(!req.body.mobile) {
        res.json({ "message": "Mobile Number is required" })
    } else if(!req.body.userName) {
        res.json({ "message": "User Name is required" })
    } else if(!req.body.password) {
        res.json({ "message": "Password is required" })
    } else if(!req.body.address) {
        res.json({ "message": "Address is required" })
    } else {
        user.password = bcrypt.hashSync(user.password, salt);
        user.save(function(err, user) {
            if(err) {
                res.json({ status: false, "message": "Given USER details are already Exists !" })
            } else {
                res.json({ status: true, "message": "USER created Successfully !", user: user })
            }
        })
    }
})

router.get('/getUsers', function(req, res) {
    User.find(function(err, user){
        if(err) {
            res.json({ "status": false, 'message': err, "data": user })
        } else {
            res.json({ "status": true, 'message': 'User Details fetched successfully', "data": user })
        }
    })    
})


router.post('/addFarmer', function(req, res) {
    let farmer = new Farmer(req.body);
    farmer.save(function(err, farmer) {
        if(err) {
            res.json({ status: false, message: 'Error' })
        } else {
            res.json({ status: true, message: 'Farmer details added', data: farmer })
        }
    })
})

module.exports = router;