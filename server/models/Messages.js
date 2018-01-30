'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessagesSchema = new mongoose.Schema({
    text: String,
    ref_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom'
    }
});

var model = mongoose.model('Messages', MessagesSchema);

module.exports = model;