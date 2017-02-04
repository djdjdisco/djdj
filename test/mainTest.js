var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('request');
var serverAddress = 'http://localhost:3000';
// var server = require('../server/server.js');
var should = chai.should;
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);

describe('Server', function() {
  describe('"Basic GET requests"', function() {
    it('should accept get requests to default address', function(done) {
      chai.request(serverAddress)
        .get('/')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should accept get requests to login page', function(done) {
      chai.request(serverAddress)
        .get('/login')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should accept get requests to signup page', function(done) {
      chai.request(serverAddress)
        .get('/signup')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('"Authentication"', function() {
    it('should allow users to attempt to sign up', function(done) {
      chai.request(serverAddress)
        .post('/signup')
        .send({ username: 'me', password: '123' })
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should allow users to log in if signed up', function(done) {
      chai.request(serverAddress)
        .get('/')
        .query({ username: 'me', password: '123' })
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.redirects.length).to.equal(0);
          done();
        });
    });

    it('should not allow users to log in if not signed up', function(done) {
      chai.request(serverAddress)
        .get('/')
        .query({ username: '12312v481b724v', password: '1231' })
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.redirects.length).to.equal(1);
          done();
        });
    });

    it('should not allow users to log in if entered password is incorrect', function(done) {
      chai.request(serverAddress)
        .get('/')
        .query({ username: 'me', password: '11' })
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.redirects.length).to.equal(1);
          done();
        });
    });

    it('should not allow users to log in if entered username does not exist', function(done) {
      chai.request(serverAddress)
        .get('/')
        .query({ username: '468686868346824cbaxe21u31y2x3idx345vdsqj1231sd', password: '11' })
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.redirects.length).to.equal(1);
          done();
        });
    });

  });

});