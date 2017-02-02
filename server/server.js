var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

var data = {
  count: 0
};

app.use( function(req, res, next) {
  console.log('Now serving ' + req.method + ' @ ' + req.url);
  next();
});

app.use('/callback', function (req, res, next) {
  // do something with code and state
  if ( data[data.count] !== req.query.code ) {
    data[++data.count] = req.query.code;
  }
  // console.log('Before next');
  next();
});

// <<<<<<< HEAD
app.set('views', 'public')
app.set('view engine', 'ejs')
app.use(express.static('public'));


// =======
// app.use('/callback', express.static(path.join(__dirname, '../public')));

app.get('/callback', function(req, res) {
  // console.log('inside first callback : ', data);
  res.sendFile(path.join(__dirname, '../public/refreshToken.html'));  
});
// >>>>>>> 64489a4a5d0bfa333788753b98c0e6a5cfee051c

app.get('/refreshToken', function(req, res) {
  console.log('Inside refreshToken', data)
  res.json(data);
});

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

var port = 3000;
app.listen(port, function () {
  console.log('You are now running on port ' + port + '!');
})

app.get('/', function (req, res) {
	console.log('you made it home')
  res.render('index')
});
