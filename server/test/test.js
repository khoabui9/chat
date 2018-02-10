var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var server = supertest.agent("http://localhost:3000");

var C = require('../controllers/app.controller');

// UNIT test begin

describe("SAMPLE unit test", function () {
  // #1 should return home page
  it("should return login page", function (done) {
    // calling home page api
    server
      .get("/")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.be.equal(200);
        done();
      });
  });
});

describe("api post add user", function () {
  it("should return name of user", function (done) {
    server
      .post('/api')
      .set('Accept','application/x-www-form-urlencoded')
      .send({ name: "khoa" })
      .end(function (err, res) {
        console.log(res.body);
        res.body.should.have.property("name");
        res.body.name.should.equal('khoa');
        res.status.should.be.equal(200);
        done();
      });
  });
});

// describe('Add user', function () {
//   it('should have a addUser Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.addUser, 'function');
//   })
// });

// describe('Add room', function () {
//   it('should have a addRoom Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.addRoom, 'function');
//   })
// });

// describe('Get chatList', function () {
//   it('should have a getChatList Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.getChatList, 'function');
//   })
// });

// describe('Store message', function () {
//   it('should have a storeMessage Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.storeMessage, 'function');
//   })
// });

// describe('Get messages', function () {
//   it('should have a getMessages Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.getMessages, 'function');
//   })
// });

// describe('Save user to room', function () {
//   it('should have a saveUserToRoom Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.saveUserToRoom, 'function');
//   })
// });

// describe('Remove user', function () {
//   it('should have a removeUser Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.removeUser, 'function');
//   })
// });

// describe('Get room has user', function () {
//   it('should have a getRoomHasUser Method', function () {
//     assert.equal(typeof C, 'object');
//     assert.equal(typeof C.getRoomHasUser, 'function');
//   })
// });