var express = require('express');
var AppController = require('./controllers/app.controller');
var router = express.Router();

router.post('/api', AppController.addUser);

router.post('/api/saveinroom', AppController.saveUserToRoom);

router.post('/api/removeuser', AppController.removeUser);

router.get('/api/getroomuser', AppController.getRoomHasUser);

router.get('/api/chatrooms', AppController.getChatList);

router.post('/api/addroom', AppController.addRoom);

router.post('/api/addmess', AppController.storeMessage);

router.get('/api/getmess', AppController.getMessages);

module.exports = router;