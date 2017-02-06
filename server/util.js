var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'), { multiArgs: true} );
var axios = require('axios');

// var authData = {};
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';


//how to access original password input
var checkUser = function(req, res, next) {
  console.log(req.query, "req query in check USER")
  if (req.query.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

var hashPassword = function(username, plainPassword, cb) {
  bcrypt.hash(plainPassword, saltRounds)
  .then( function(hashedPassword) {
    cb(hashedPassword);
  })
  .catch( function(err) {
    console.log('There is error in hashPassword', err);
  });
};


// module.exports.authData = authData;
module.exports.checkUser = checkUser;
module.exports.hashPassword = hashPassword;
// module.exports.savePassword = savePassword;