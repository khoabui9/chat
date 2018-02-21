var assert = require("assert");
var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();

var server = supertest.agent("http://localhost:3000");

var C = require('../controllers/app.controller');

describe("login page", function () {
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
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({ name: "khoa" })
            .end(function (err, res) {
                res.body.should.have.property("name");
                res.body.name.should.equal('khoa');
                res.status.should.be.equal(200);
                done();
            });
    });
});

describe("api remove user", function () {
    it("should return name of user removed", function (done) {
        server
            .post('/api/removeuser')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                title: 'public',
                name: "khoa"
            })
            .end(function (err, res) {
                res.status.should.be.equal(200);
                done();
            });
    });
});

