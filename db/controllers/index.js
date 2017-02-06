var db = require('../index.js');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'), { multiArgs: true} );


module.exports = {
	songs: {
		get: function (req, res) {
			db.Song.findOne( {where: { title: req.body.title }})
			.then(function(song) {
				res.json(song);
			})
		},
		post: function (req, res) {
			db.Song.findOrCreate( {where: { title: req.body.title }})
			.spread(function(song, created) {
				res.sendStatus(created ? 201 : 200);
			})
		}
	},

	users: {
		//login
		get: function (req, res) {
			console.log(req.query, 'request')
			db.User.findOne( { where: { username: req.query.username} })
			.then(function(user) {
				console.log(user.username, "username")
				var inputPass = req.query.password;
				console.log(inputPass, "input password");
				console.log(user.password, "hashed password");
				bcrypt.compare(inputPass, user.password)
			  .then( function(isAuthenticated) {
			    console.log('Is this user authenticated ? ', isAuthenticated);
			    if ( isAuthenticated  ) {
			      res.redirect('/?authenticated=' + isAuthenticated);
			    } else {
			      res.redirect('/login');
			    }
			  })
			  .catch( function(err) {
			    console.log('There is error in checkUser', err);
			    res.redirect('/login');
			  });
				//redirect to server (then we will hit check)
				// res.redirect('/?username=' + user.username + '&password=' + user.password);
			})
			.catch(function(err) {
				console.log('db controller error: ', err);
			})
		},
		//signup
		post: function (req, res) {
			console.log(req.query.username, 'user?')
			console.log(req.query.password, "password?")
			db.User.findOrCreate( { where: { username: req.query.username, password: req.query.password } })
			.spread (function (user, created) {
				console.log(created, 'created in post db controller');
				console.log(user, 'user in post db controller')
				res.redirect('/login');
			})
			.catch(function(err) {
				console.log('You already have an account, please login!');
				console.log('db controller error: ', err);
				res.redirect('/login');
			})
		}

	}
}