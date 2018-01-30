var assert = require("assert");

var C = require('../controllers/app.controller');

describe('Add User', function(){
    describe('Module C', function(){
      it('should have a addUser Method', function(){
        assert.equal(typeof C, 'object');
        assert.equal(typeof C.addUser, 'function');
      })
    })
  });  