var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('Email Test', function() {
    describe('#email contact()', function() {

        before(function(done) {
            // In our tests we use the test db
            mongoose.connect(config.mongo.uri + config.mongo.db, function() {
                mongoose.connection.db.dropCollection('users', function() {
                    done();
                });
            });
        });

        after(function(done) {
            mongoose.connection.db.dropCollection('users', function() {
                mongoose.disconnect();
                    done();
                });
        });

        it('POST /user - should create the user breogangf', function(done) {
            request(config.url)
                .post('/api/user')
                .send({
                    "username": "breogangf",
                    "email": "breogangf@gmail.com",
                    "password": "Breogan2015",
                    "created_at": 1439736878000,
                    "blocked": false
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('POST /email - should send a new email', function(done) {
            request(config.url)
                .post('/api/email')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "subject": "Welcome to myFuelCloud",
                    "from": "support@5labs.com",
                    "to": "breogangf@gmail.com",
                    "message": "<h1><b>We're glad you fund us!</b></h1><p><h2>Welcome to myFuelCloud. Here are a few things we love (and hope you love to):</h2></p><ol type=\"1\"><li><h3>We're 100% funded by our customers. We <3 you guys.</h3></li><li><h3>This is an <a href=\"https://github.com/breogangf/myFuelCloud/\">opensource</a> project, you can help make this app even better!</h3></li><li><h3>We make lots of cool stuff, you can take a look at <a href=\"http://5labs.com/\">5labs.com</a></h3></li></ol><br><h3>We're happy to have you onboard and we'd love to hear from you!</h3> <h3>Happy fueling,</h3><br><h3>Breogán González</h3>"
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });
});