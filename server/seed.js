var ChatRoom = require('./models/ChatRoom');

var roomData = [
	{
		title: "public",
	},
	{
		title: "room 1",
	},
];

ChatRoom.remove({}, function (err) {
	if (err) console.error(err);
	ChatRoom.create(roomData, function (err, chatrooms) {
		if (err) console.error(err);
	});
});