const express = require('express');
const router = express.Router();
const request = require('request');
const dbCall = require('./dbcall.js');

router.post('/contactDetails', (req, res) => {
    console.log(req.body);
    if(req.body.id) {
        dbCall.httpCall('GET', 'https://jsonplaceholder.typicode.com/posts', true, "", function(data) {
            if(data) {
                var parseData = JSON.parse(data);
                var saveData = [];
                for(var i = 0; i < parseData.length; i++) {
                    if(parseData[i].userId == req.body.id) {
                        //saveData += JSON.stringify(parseData[i]);
                        saveData.push({ id: parseData[i]["id"], title: parseData[i]["title"], body: parseData[i]["body"] });
                    } 
                }
                //console.log(saveData);
                if(saveData.length > 0) {
                    res.json({status:true, data: saveData});
                } else {
                    res.json({status:true, "message": "No records found"});
                }
            } else {
                res.json({status: false, message:'Wrong call'})
            }        
        })
   } else {       
       res.json({status: false, message:'Wrong id entered'})
    }
   
    
});

router.get('/getContacts', function(req, res) {
    try  {
        dbCall.httpRequestCall("GET", "https://jsonplaceholder.typicode.com/posts", function(data, status) {
            var respData = data;
            //console.log('respData::::>>>', data);
            var saveData = [];
            if(data != null && data != "null" && data != 'undefined' && data != undefined && data != "") {
                console.log('ASDFASDFASDF', status);
                res.json({ status: 'Ok', message:'Success', data: JSON.parse(data)})
            } else {
                res.json({ status: 'NotOk', message:'Error', data: "" })
            }
        })
    } catch(e) {
        console.log(e.message, 'NotOk');
    }    
})

module.exports = router;