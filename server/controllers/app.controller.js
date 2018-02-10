var ChatRoom = require('../models/ChatRoom');
var User = require('../models/User');
var Messages = require('../models/Messages');
/**
 * add User
 * @param {*} req 
 * @param {*} res 
 */
addUser = (req, res) => {
    //console.log(req.body.name);
    var user = new User({
        name: req.body.name
    });
    user.save(function (err,data) {
        if (err) return handleError(err);
        res.status(200);
        res.json(data);
    })
}

addRoom = (req, res) => {
    var room = new ChatRoom({
        title: req.body.title
    });
    room.save(function (err) {
        if (err) return handleError(err);
    })
    res.status(200);
    res.json();
}

/**
 * get chat room list
 * @param {*} req 
 * @param {*} res 
 */
getChatList = (req, res) => {
    ChatRoom.find(function (err, chatlist) {
        if (err) return next(err);
        res.status(200);
        res.json(chatlist);
    });
}

storeMessage = (req, res) => {
    var user;
    var room;
    var text = req.body.text;
    User.findOne({
        name: req.body.user
    }, function (err, data) {
        user = data._id;
    });
    ChatRoom.findOne({
        title: req.body.room
    }, function (err, data) {
        room = data._id;
        data.save(function (err, updatedRoom) {
            var message = new Messages({
                text: req.body.text,
                ref_user: user,
                ref_room: room
            });
            message.save(function (err) {
                if (err) return handleError(err);
            })
            if (err) return handleError(err);
        });
    });
    res.status(200);
    res.json();
}

getMessages = (req, res) => {
    var room;
    ChatRoom.findOne({
        name: req.body.room
    }, function (err, data) {
        room = data._id;
    });
    Messages.find().
        populate('ref_user').
        exec(function (err, messages) {
            if (err) return next(err);
            res.status(200);
            res.json(messages);
        });
}

saveUserToRoom = (req, res) => {
    ChatRoom.findOneAndUpdate({
        title: req.body.title
    }, {
            $push: {
                user: req.body.user
            }
        },
        function (err, data) {
            console.log(err);
        }
    );
}

removeUser = (req, res) => {
    ChatRoom.update({
        title: req.body.title
    }, {
            "$pull": {
                "user": {
                    "name": req.body.name
                }
            }
        }, {
            safe: true,
            multi: true
        }, function (err, obj) {
            res.json(obj)
        });
}

getRoomHasUser = (req, res) => {
    ChatRoom.find({
        user: {
            $elemMatch: {
                name: req.query.user
            }
        }
    }, function (err, data) {
        if (err) return next(err);
        res.status(200);
        res.json(data);
    })
}

module.exports = {
    addUser: addUser,
    addRoom: addRoom,
    getChatList: getChatList,
    storeMessage: storeMessage,
    getMessages: getMessages,
    saveUserToRoom: saveUserToRoom,
    getRoomHasUser: getRoomHasUser,
    removeUser: removeUser,
};