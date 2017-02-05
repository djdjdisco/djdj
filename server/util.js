var Promise = require('bluebird');
bcrypt = Promise.promisifyAll(require('bcrypt'), { multiArgs: true} );
var axios = require('axios');

var authData = {};
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


//how to access original password input
var checkUser = function(req, res, next) {
  var username = req.body.username;
  var plainPassword = req.body.password;
  console.log(username, plainPassword);
  res.redirect('/login')
  bcrypt.compare(plainPassword, req.query.password)
  .then( function(isAuthenticated) {
    console.log('Is this user authenticated ? ', isAuthenticated);
    if ( isAuthenticated  ) {
      next();
    } else {
      res.redirect('/login');
    }
  })
  .catch( function(err) {
    console.log('There is error in checkUser', err);
    res.redirect('/login');
  });
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

var savePassword = function(username, hashedPassword) {
  //here we need to query insert to the db
  authData[username] = hashedPassword;
};



module.exports.authData = authData;
module.exports.checkUser = checkUser;
module.exports.hashPassword = hashPassword;
module.exports.savePassword = savePassword;