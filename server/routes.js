var controller = require('../db/controllers/index.js');
var router = require('express').Router();

//routes for user
router.get('/login', controller.users.get);
router.get('/signup', controller.users.post);


//routes for songs
router.get('/api/songs', controller.songs.get);
router.post('/api/songs', controller.songs.post);

module.exports = router;