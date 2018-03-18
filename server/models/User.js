'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true
      }
});

var model = mongoose.model('User', UserSchema);

module.exports = model;