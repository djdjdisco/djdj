var db = require('../index.js');


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
			db.User.findOne( { username: req.query.username} )
			.then(function(user) {
				console.log(user, 'meow')
				res.redirect('/?username=' + user.username + '&password=' + user.password);
			})
			.catch(function(err) {
				console.log('db controller error: ', err);
			})
			// .then(function (user) {
			// 	var password = req.query.password;
			// 	var hash = res.query.password;
			// 	//user instance methods
			// 	// this.validPassword(password, hash);
			// })
			// .catch(function (err) {
			// 	console.log('Error with account lookup: ', err);
			// })
		},
		//signup
		post: function (req, res) {
			console.log(req.query.username, 'user?')
			console.log(req.query.password, "password?")
			db.User.create( {username: req.query.username, password: req.query.password})
			.then (function (user, created) {
				console.log('created')
				res.redirect('/login');
			})
			.catch(function(err) {
				console.log('db controller error: ', err);
			})
		}

	}
}