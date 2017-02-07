var db = require('../index.js');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'), { multiArgs: true} );

module.exports = {
	songs: {
		get: function (req, res) {
			db.Song.findAll({})
			.then(function(playlist) {
				res.json(playlist);
			});
		},
		post: function (req, res) {
			db.Song.findOrCreate( {where: { src: req.body.src, data: req.body.data }})
			.spread(function(song, created) {
				res.send(song);
			})
		},
		delete: function (req, res) {
			db.Song.destroy( {where: {src: req.body.src} } )
			.then(function() {
				res.send('success')
				console.log('delete was successful')
			})
		}
	},

	users: {
		//login
		get: function (req, res) {
			db.User.findOne( { where: { username: req.query.username} })
			.then(function(user) {
				var inputPass = req.query.password;
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