var User = require('../models/User');

var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var controller = require('../controllers/app.controller');

describe('save and find Record', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/thesis', {
      useMongoClient: true
    }, function (err) {
      if (err) {
        console.log('Failed connecting to MongoDB!');
      } else {
        console.log('Successfully connected to MongoDB!');
        done()
      }
    });
    var user = new User({
      name: "test"
    });
    controller.saveUser(user);
  });
  it('Should return data saved to the database', function (done) {
    User.findOne({name: "test"}, (err, data) => {
      data.should.have.property("name");
      data.name.should.equal("test");
      done();
    });
  });
  after(function (done) {
    mongoose.connection.close(done);
  });
});
