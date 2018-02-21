var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var server = supertest.agent("http://localhost:3000");

var C = require('../controllers/app.controller');

describe('Add user', function () {
    it('should have a addUser Method', function () {
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.addUser, 'function');
    })
});

describe('Save user to room', function () {
    it('should have a saveUserToRoom Method', function () {
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.saveUserToRoom, 'function');
    })
});

describe('Remove user', function () {
    it('should have a removeUser Method', function () {
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.removeUser, 'function');
    })
});