var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 3000;

app.set('views', 'public')
app.set('view engine', 'ejs')
app.use(express.static('public'));



app.listen(port, function () {
  console.log('You are now running on port ' + port + '!');
})

app.get('/', function (req, res) {
	console.log('you made it home')
  res.render('index')
});
