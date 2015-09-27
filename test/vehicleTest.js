var config = require('../config');
var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
require('../server.js');

describe('Vehicle Test', function() {
    describe('#vehicle model()', function() {
        var breogangf_id;
        var braisgf_id;
        var first_breogangf_vehicle;
        var third_breogangf_vehicle;

        before(function(done) {
            // In our tests we use the test db
            mongoose.connect(config.mongo.uri + config.mongo.db, function() {
                mongoose.connection.db.dropCollection('vehicles', function() {
                    mongoose.connection.db.dropCollection('users', function() {
                    done();
                    });
                });
            });
        });

        after(function(done) {
            mongoose.connection.db.dropCollection('vehicles', function() {
                mongoose.connection.db.dropCollection('users', function() {
                mongoose.disconnect();
                done();
                });
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
                    breogangf_id = res.body._id;
                    done();
                });
        });

        it('POST /user - should create the user braisgf', function(done) {
            request(config.url)
                .post('/api/user')
                .send({
                    "username": "braisgf",
                    "password": "Brais2015",
                    "created_at": 1439736878006,
                    "blocked": false
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    braisgf_id = res.body._id;
                    done();
                });
        });

        it('POST /vehicle - should create a vehicle using breogangf user', function(done) {
            request(config.url)
                .post('/api/vehicle')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "brand": "Mazda",
                    "model": "CX-5",
                    "year": 2015,
                    "created_at": 1439736879,
                    "created_by": breogangf_id
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    first_breogangf_vehicle = res.body._id;
                    done();
                });
        });

        it('POST /vehicle - should create a second vehicle using breogangf user', function(done) {
            request(config.url)
                .post('/api/vehicle')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "brand": "Audi",
                    "model": "S3",
                    "year": 2009,
                    "created_at": 1439736889,
                    "created_by": breogangf_id
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('POST /vehicle - should create a third vehicle using breogangf user', function(done) {
            request(config.url)
                .post('/api/vehicle')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "brand": "Subaru",
                    "model": "WRX sti",
                    "year": 2015,
                    "created_at": 1439736899,
                    "created_by": breogangf_id
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    third_breogangf_vehicle = res.body._id;
                    done();
                });
        });        

        it('POST /vehicle - should create a vehicle using braisgf user', function(done) {
            request(config.url)
                .post('/api/vehicle')
                .set('Authorization', 'Basic YnJhaXNnZjpCcmFpczIwMTU=')
                .send({
                    "brand": "Chevrolet",
                    "model": "Camaro",
                    "year": 2014,
                    "created_at": 1439736855,
                    "created_by": braisgf_id
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('PUT /vehicle/id - should update first breogangf\'s vehicle', function(done) {
            request(config.url)
                .put('/api/vehicle/' + first_breogangf_vehicle)
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "brand": "Mazda",
                    "model": "CX5",
                    "year": 2014,
                    "created_at": 1439736879,
                    "created_by": breogangf_id
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('model', 'CX5');
                    res.body.should.have.property('year', 2014);
                    done();
                });
        });

        it('DELETE /vehicle/id - should delete the third vehicle created by breogangf', function(done) {
            request(config.url)
                .del('/api/vehicle/' + third_breogangf_vehicle)
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('GET /vehicle - should return all the vehicles created by breogangf', function(done) {
            request(config.url)
                .get('/api/vehicle/')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    res.body.should.have.length(2);
                    res.body[0].should.have.property('year', 2014);
                    res.body[1].should.have.property('model', 'S3');
                    done();
                });
        });

        it('GET /vehicle/id - should return second vehicle created by breogangf', function(done) {
            request(config.url)
                .get('/api/vehicle/' + first_breogangf_vehicle)
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('model', 'CX5');
                    res.body.should.have.property('year', 2014);
                    done();
                });
        });

    });
});