var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var session = require('express-session');

var app = express();

app.use(session({
  secret: 'djdj',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/static', express.static(path.join(__dirname, '../public')));

var data = {
  state: 0
};

app.use( function(req, res, next) {
  console.log('Now serving ' + req.method + ' @ ' + req.url);
  next();
});

app.get('/callback', function (req, res) {
  console.log('inside /callback');
  var state = req.query.state;
  if (req.query.error) {
    res.redirect(302, '/');
  } else {
    var code = req.query.code;
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: { 
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'http://localhost:3000/callback',
        'client_id': '0ed3118ffbe840e994830826df162d78',
        'client_secret': '873b59a52cc541a3befd02246f1019a3'
      }
    })
    .then(function(tokenResponse){
      console.log("123", tokenResponse.data);
      data[state] = tokenResponse.data;
      data[state]['Content-Type'] = 'application/json';
      data[state]['client_id'] = '0ed3118ffbe840e994830826df162d78';
      data[state]['client_secret'] = '873b59a52cc541a3befd02246f1019a3';
      
      // req.session.cookie = state;
      console.log('saved successfully', tokenResponse.data);
      axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'get',
        params: data[state]
      })
      .then(function(userInfoResponse) {  
        if ( userInfoResponse.data.id === 'djkorean1' ) {
          data['dj'] = userInfoResponse.data;
          data['dj']['access_token'] = tokenResponse.data['access_token'];
          data['dj']['refresh_token'] = tokenResponse.data['refresh_token'];
        }

        data[state].data = userInfoResponse.data;
        var playListUrl = userInfoResponse.data.href + '/playlists';
        var params = {
          'access_token': data[state]['access_token'],
          'Content-Type': 'application/json'
        };
        var body = {
          name: 'djdj'
        };

        console.log('!!! params : ', data[state]);
        axios({
          url: playListUrl,
          method: 'post',
          params: params,
          data: body,
        })
        .then(function(res) {
          console.log('@@@', res);
        })
        .catch(function(err) {
          console.log('33333', err);
        });
      })
      .catch(function(err) {
        console.log('2', err);
      });
    })
    .catch(function(err) {
      console.log('error : ', err);
    });  
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

app.get('/state', function(req, res) {
  res.end(JSON.stringify(data.state++));
});

// app.set('views', 'public')
// app.set('view engine', 'ejs')
// app.use(express.static('public'));


app.get('/callback', function(req, res) {
  // console.log('inside first callback : ', data);
  res.sendFile(path.join(__dirname, '../public/refreshToken.html'));  
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
