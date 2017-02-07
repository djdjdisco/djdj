var Sequelize = require('sequelize');
var Promise = require('bluebird');
// bcrypt = Promise.promisifyAll(require('bcrypt'), {multiArgs:true});
var orm;
// process.env.DATABASE_URL = 'postgres://hpblhrvcoewnjp:041e28a7f451fc8fbd5ff9d92cd082db1e063ae66816a9c0b6b022947f6ef9f3@ec2-54-235-248-197.compute-1.amazonaws.com:5432/dbcghuk10tpnnm';
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




module.exports.con = orm;

module.exports.Song = Song;
module.exports.User = User;
// module.exports.Playlist = Playlist;
