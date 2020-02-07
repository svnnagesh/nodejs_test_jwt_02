const express = require('express');
const app = express();
const router = express.Router();

let Business = require('../models/Business');

//Define storage route
router.post('/add', function(req, res) {

    let business = new Business(req.body);
    
    if(!req.body.personName) {
        res.json({ "message": 'Person Name is required' });
    } else if(!req.body.businessName) {
        res.json({ "message": 'Business Name is required' });
    } else if(!req.body.businessGSTNo) {
        res.json({ "message": 'GST is required' });
    } else {
        Business.find({ businessGSTNo: req.body.businessGSTNo }, function(err, checkUserResp) {
            // console.log('err', err);
            // console.log('checkUserResp', checkUserResp)
            if(checkUserResp.length > 0){
                // console.log('checkUserResp:::', checkUserResp[0].businessName)
                res.json({ "message": "Business GST Number is Exists", "data": "" });                
            } else {
                business.save(function(err, business) {
                    console.log('error', err);
                    console.log('business', business);
                    if(err) {
                        res.json({ status: false, "message": "Unable to add Business", "data": "" });
                    } else {
                        res.json({ status: true, "message": "Business Added Successfully !", "data": business });
                    }
                })
            }
        })
    } 
})

// Defined get data(index or listing) route
router.get('/getBusiness', function(req, res) {
    Business.find(function(err, business){
        if(err) {
            res.json({ "status": false, 'message': err, "data": business })
        } else {
            res.json({ "status": true, 'message': 'Business Details fetched successfully', "data": business })
        }
    })    
})

// Defined edit route
router.get('/edit/:id', function(req, res) {
    let id = req.params.id;
    Business.findById(id, function(err, business) {
        if(err) {
            console.log(err)
        } else {
            res.json(business)
        }        
    })
})

// Defined update route
router.post('/update/:id', function(req, res) {
    //let business = new Business(req.body);
    Business.findById(req.params.id, function(err, business) {
        if(!business) {
            return new Error('Could not load document')
        } else {
            business.personName = req.body.personName;
            business.businessName = req.body.businessName;
            business.businessGSTNo = req.body.businessGSTNo;  

            business.save()
            .then(business=> {
                res.json({ 'message': 'Data Updated Successfully', "data": business });
            })
            .catch(err=> {
                res.json({ 'message': 'Unable to update database', "data": "" });
            })
        }
    })
})

// Defined delete | remove | destroy route
router.delete('/delete/:id', function (req, res) {
    console.log(req.params.id);
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) {
            res.json(err);
        } else {
            res.json({ 'message': 'Successfully removed', "data": "" });
        }
    });
});

module.exports = router;