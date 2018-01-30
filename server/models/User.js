'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
});

var model = mongoose.model('User', UserSchema);

module.exports = model;