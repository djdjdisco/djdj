var Sequelize = require('sequelize');
var Promise = require('bluebird');
// bcrypt = Promise.promisifyAll(require('bcrypt'), {multiArgs:true});
var orm;
if (!process.env.DATABASE_URL) {
	orm = new Sequelize('djsdj', null, null, {
			dialect: "postgres",
		  port: 5432
	});
} else {
	orm = new Sequelize(process.env.DATABASE_URL, {
		dialect: "postgres"
	});
}
	
//use this for when we deploy

//db name, user, password
// var orm = new Sequelize('djsdj', null, null, {
// 		dialect: "postgres",
// 	  port: 5432
// });

var Song = orm.define('song', {
	src: Sequelize.STRING,
	data: Sequelize.STRING(1000)
},
{
	timestamps: false
});

// var Playlist = orm.define('playlist', {
// 	name: Sequelize.STRING
// });

var User = orm.define('user', {
	username: {type: Sequelize.STRING, unique: true},
	password: Sequelize.STRING
},
{
	timestamps: false
});



// {
// 	timestamps: false,
//   classMethods: {
//     generateHash: function(plainPassword) {
//     	console.log('inside generateHash');
//       	bcrypt.hash(plainPassword[0], 10)
//       	.then( function(hashPassword) {
//       		console.log('inside then');
//       		return [hashPassword];
//       	})
// 			  .catch( function(err) {
// 			    console.log('There is error in hashPassword', err);
// 			  });
//       		console.log('before hey');
// 			  // return ['hey'];
//     },
//     validPassword: function(plainPassword, hash) {
//       return bcrypt.compare(plainPassword, hash)
//       	.catch( function(err) {
//       		console.log('There is an error in validating password, ', err);
//       	});
//     },
// 	}
// }

//PAST MVP: we can use these relations to create multiple playlists
// Song.belongsToMany(Playlist, {through: 'userPlaylist'});
// Playlist.hasMany(Song);
/*define relations for user and DJ
In current scope of MVP, the user objects are just used for auth, no relations
*/


module.exports.con = orm;

module.exports.Song = Song;
module.exports.User = User;
// module.exports.Playlist = Playlist;
