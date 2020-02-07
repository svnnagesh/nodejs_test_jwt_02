const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwtCls = require('./jwt');
const User = require('./models/user');

router.post('/authenticate', (req, res) => {
    if(req.body.userName == "vengal.nagesh" && req.body.passWord == "nagesh@123"){
        var jwtObj = {id:1, username: req.body.userName};
        res.json({ status: true, message: "success", token: jwtCls.generateUserJwtToken(jwtObj) })
    } else {
        res.json({status: false, message:'Invalid credentials'})
    }
});

router.post('/login', (req, res)=> {
    //console.log('req.body::::', req.body);
    //let user = new User(req.body);
    //console.log(user);   

    //User.find({ userName: req.body.userName }).sort('-mobile').select('firstName lastName password userName').exec(userFun)
    
	if(!req.body.email) {
		res.json({ status: false, message: 'Email required' })
	} else if(!req.body.password) {
		res.json({ status: false, message: 'Password required' })
	} else {
		User.findOne({email: req.body.email}, function(err, user) {
        if(!req.headers.token) {
            res.json({ status: false, message: 'token is required' })
        } else {
            if(user) {
                var validPwd = bcrypt.compareSync(req.body.password, user.password)
                if(validPwd) {
					res.json({ status: true, message: 'Logged In', data: user })
                } else {
					res.json({ status: false, message: 'Password mismatch' })
                }
            } else {
                res.json({ status: false, message: 'e', data: "" })
            }
        }
        
        /* if(err) {
            res.json({ status: false, message: 'Request Error !' })
        } else if(user) {
            if(!req.body.email) {
                res.json({ status: false, message: 'Email is empty' })
            } else if(!req.body.password) {
                res.json({ status: false, message: 'Password is empty' })
            } else if(req.body.email != user.email) {
                console.log(req.body.email, user.email);
                res.json({ status: false, message: 'Email is mismatch' })
            } else if(!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({ status: false, message: 'Password is mismatch' })
            } else {
                res.json({ status: true, message: 'Success', data: user })
            }
        } */
    })

    /* User.findOne({userName: req.body.userName}, function(err, user) {
        if(err) {
            res.json({ status: false, message: 'Request Error !', data: "" })
        } else if(user){
            if(req.body.userName != user.userName) {
                res.json({ status: false, message: 'UserName mismatch', data: "" })    
            } else if(req.body.password != user.password) {
                res.json({ status: false, message: 'Password mismatch', data: "" })    
            } else {
                res.json({ status: true, message: 'User Exists !', data: user })
            }
        } else {
            console.log('e', user)
            res.json({ status: false, message: 'User Does not Exists !!. Please Register', data: "" })
        }
    }) */
	}
	
    
})

module.exports = router;