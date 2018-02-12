var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var server = supertest.agent("http://localhost:3000");

var C = require('../controllers/app.controller');