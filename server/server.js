var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var bcrypt = require('bcrypt');
var session = require('express-session');
var util = require('./util');

// var session = require('express-session');
var db = require('../db/index.js');
var routes = require('./routes.js');

var app = express();


db.Song.sync();
// db.Playlist.sync();
db.User.sync();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'djdj',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use('/api/', routes);

// all static files/modules being served
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/static', express.static(path.join(__dirname, '../public')));


app.use( function(incomingRequest, res, next) {
  console.log('Now serving ' + incomingRequest.method + ' @ ' + incomingRequest.url);
  next();
});

// serving the user index.html
app.get('/', util.checkUser, function(req, res) {
// app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
    util.hashPassword(username, password, function(hashedPassword) {
      res.redirect('/api/signup/?username=' + username + '&password=' + hashedPassword);
    });
});





var port = 3000;
app.listen(port, function () {
  console.log('You are now running on port ' + port + '!');
})
