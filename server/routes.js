var controller = require('../db/controllers/index.js');
var router = require('express').Router();

//routes for user
router.get('/login', controller.users.get);
router.get('/signup', controller.users.post);


//routes for songs
router.get('/songs', controller.songs.get);
router.post('/songs', controller.songs.post);
router.delete('/songs', controller.songs.delete);

module.exports = router;