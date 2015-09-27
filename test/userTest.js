var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('User Test', function() {
    describe('#user model()', function() {
        var temp_id;
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

        it('POST /user - shouldn\'t create the user breogangf again', function(done) {
            request(config.url)
                .post('/api/user')
                .send({
                    "username": "breogangf",
                    "password": "Breogan2015",
                    "created_at": 1439736878000,
                    "blocked": false
                })
                .expect(409)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('POST /user - should create the user braisgf', function(done) {
            request(config.url)
                .post('/api/user')
                .send({
                    "username": "braisgf",
                    "password": "Brais2015",
                    "created_at": 1439736878001,
                    "blocked": false
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    temp_id = res.body._id;
                    done();
                });
        });

        it('PUT /user/id - should update the user braisgf', function(done) {
            request(config.url)
                .put('/api/user/' + temp_id)
                .set('Authorization', 'Basic YnJhaXNnZjpCcmFpczIwMTU=')
                .send({
                    "username": "braisgf6",
                    "password": "Brais2016",
                    "created_at": 1439736878001,
                    "blocked": false
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('username', "braisgf6");
                    done();
                });
        });

        it('GET /user - should return all the users', function(done) {
            request(config.url)
                .get('/api/user')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    res.body.should.have.length(2);
                    res.body[0].should.have.property('username', 'breogangf');
                    res.body[1].should.have.property('username', 'braisgf6');
                    done();
                });
        });

        it('GET /user/id - should return the user braisgf', function(done) {
            request(config.url)
                .get('/api/user/' + temp_id)
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('username', 'braisgf6');
                    done();
                });
        });

        it('GET /user/username/username - should return the user braisgf by name', function(done) {
            request(config.url)
                .get('/api/user/username/braisgf6')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('username', 'braisgf6');
                    done();
                });
        });

        it('GET /user/username/username - shouldn\'t return the user manuel by name', function(done) {
            request(config.url)
                .get('/api/user/username/manuel')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });


        it('DELETE /user/id - should delete the user breogangf', function(done) {
            request(config.url)
                .del('/api/user/' + temp_id)
                .end(function(err, res) {
                    done();
                });
        });

    });
});