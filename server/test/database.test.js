var User = require('../models/User');

var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var C = require('../controllers/app.controller');

describe('Saving Records', function () {
    it( 'Should allow models to be saved to the database', function(done){
        this.timeout(5000)
        var mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        
        mongoose.connect('mongodb://localhost/thesis', { useMongoClient: true }, function (err) {
          if (err) {
            console.log('Failed connecting to MongoDB!');
          } else {
            console.log('Successfully connected to MongoDB!');
          }
        });

        var user = new User({ name: 'Zildjian' });
        user.save( function( err ){
            if ( err ){
                console.log( err );
            }
            done();
        });
    });
});
