var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var server = supertest.agent("http://localhost:3000");

var C = require('../controllers/app.controller');

describe('Add room', function () {
    it('should have a addRoom Method', function () {
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.addRoom, 'function');
    })
});

describe('Get room has user', function () {
    it('should have a getRoomHasUser Method', function () {
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.getRoomHasUser, 'function');
    })
});

describe('Get chatList', function () {
    it('should have a getChatList Method', function () {
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.getChatList, 'function');
    })
});