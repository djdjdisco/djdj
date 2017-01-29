var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 3000;

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.send('')
// });

app.listen(port, function () {
  console.log('You are now running on port ' + port + '!');
})
