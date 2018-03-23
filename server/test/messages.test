var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var server = supertest.agent("http://localhost:3000");

var C = require('../controllers/app.controller');

describe('Store message', function () {
    it('should have a storeMessage Method', function () {
      assert.equal(typeof C, 'object');
      assert.equal(typeof C.storeMessage, 'function');
    })
  });
  
describe('Get messages', function () {
  it('should have a getMessages Method', function () {
    assert.equal(typeof C, 'object');
    assert.equal(typeof C.getMessages, 'function');
  })
});
  