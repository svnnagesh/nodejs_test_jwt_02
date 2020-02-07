const express = require('express');
const router = express.Router();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
const request = require('request');

function dbCall() { }

dbCall.prototype.httpCall = function(method, url, async, params, callback) {
    //var xhttp = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    }
    if(method == 'GET') {
        xhr.open(method, url, async);
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send();
    } else {
        xhr.open(method, url, async);
        xhr.send(params);
    }    
}

dbCall.prototype.httpRequestCall = function(method, url, callback) {
    try {
        var options = { method: method, url: url };
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        request(options, function(error, response, body) {
            if(error) {
                callback(error, 'NotOk');
            } else {
                if(body["StatusCode"] == "200" && parseInt(body["ReturnCode"]) == 1) {
                    callback(body, 'Ok');
                } else {
                    callback(body, 'NotOk');
                }
            }      
        })
    } catch(e) {
        console.log(e.message, 'NotOk');
    }
    
}

module.exports = new dbCall();