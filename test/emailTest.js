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
                    "name": "Breogan",
                    "subject": "Welcome to myFuelCloud",
                    "from": "support@5labs.com",
                    "to": "breogangf@gmail.com",
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });
});