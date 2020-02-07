const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./login');
const things = require('./things.js');
const contact = require('./contact.js');
const cors = require('cors');
const jwt = require('./jwt');
const config = require('./config');
const request = require('request');
const path = require('path');
const mongoose = require('mongoose');
const port = 3200;

//routes
const businessRoute = require('./routes/business.routes');
const userRoute = require('./routes/user.routes');

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoTest1', {useNewUrlParser: true}).then(    
    ()=> {
        console.log('MongoDB is connected')
    },
    err=> {
        console.log('Cannot connect to database' + err);
    }
)

app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/hello', (req, res) => {
    res.send('Hellooooo');
})

app.post('/hello', (req, res) => {
    res.send('asdfadfasdfasd');
})

app.all('/test', (req, res) => {
    res.send('using all method');
})

app.get('/name/:id', (req, res) => {
    res.send('The id you specified is ' + req.params.id);
})



/* var options = {
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts' 
}

request(options, function(error, response, body) {
    //console.log('error', error);
    //console.log('statusCode', response && response.statusCode);
    //console.log('body', body);
    var saveData = JSON.parse(body);
    var data = ""
    for(var i = 0; i < saveData.length; i++) {
        data += saveData[i].id + ' : '
    }
    //console.log(data);
}) */

app.use('/things', things);
//app.use('/contact', contact);

app.use('/business', businessRoute);


app.use('/login', login);

app.use((req, res, next)=> {
    let token = req.headers.token || req.body.token;
    if(token) {
        try {
            req.jwt = jwt.decodeUserJwtToken(token);
            console.log('JWT VERIFICATION ::::: ')
            console.log(req.jwt);
            next();
        } catch(err) {
            if(err.message == 'jwt expired') {
                res.status(401).json({ status: false, message: "Session Expired" });
            } else {
                res.status(401).json({ status: false, message: "Invalid token" });
            }
        }
    } else {
        res.status(404).json({ status: false, message: "Token not added" });
    }
})
app.use('/contact', contact);
app.use('/user', userRoute);


app.listen(port, () => {
    console.log('Your server connection with port : ' + port);
});