var Sequelize = require('sequelize');

// var orm = new Sequelize('postgres://localhost:3000/djsdj');
//use this for when we deploy

//db name, user, password
var orm = new Sequelize('djsdj', null, null, {
		dialect: "postgres",
	  port: 5432
	});


var Song = orm.define('song', {
	title: Sequelize.STRING,
	artist: Sequelize.STRING,
	img: Sequelize.STRING,
	song_url: Sequelize.STRING
});

//a table for storing DJ's token
var DJ = orm.define('dj', {
	master_token: Sequelize.STRING,
	refresh_token: Sequelize.STRING
})

var Playlist = orm.define('playlist', {
	name: Sequelize.STRING
});

var User = orm.define('user', {
	user_name: Sequelize.STRING,
	password: Sequelize.STRING
})

Song.belongsToMany(Playlist, {through: 'userPlaylist'});
Playlist.hasMany(Song);
/*define relations for user and DJ
In current scope of MVP, the user objects are just used for auth, no relations
*/


module.exports.con = orm;
module.exports.Song = Song;
module.exports.DJ = DJ;
module.exports.Playlist = Playlist;
module.exports.User = User;
