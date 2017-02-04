var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');

// var session = require('express-session');
//var db = require('../db/index.js');

var app = express();


// db.Room.sync();
// db.DJ.sync();
// db.User.sync();


// app.use(session({
//   secret: 'djdj',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// all static files/modules being served
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/static', express.static(path.join(__dirname, '../public')));


app.use( function(incomingRequest, res, next) {
  console.log('Now serving ' + incomingRequest.method + ' @ ' + incomingRequest.url);
  next();
});

// serving the user index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// listening for all requests 
var port = 3000;
app.listen(port, function () {
  console.log('You are now running on port ' + port + '!');
})
