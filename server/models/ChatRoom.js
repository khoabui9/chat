'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatRoomSchema = new mongoose.Schema({
    title: String,
    user: [],
    _messages: [{ type: Schema.Types.ObjectId, ref: 'Messages', required: false }],
});

var model = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = model;