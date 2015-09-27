var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('Refuel Test', function() {
    describe('#refuel model()', function() {
        var breogangf_id;
        var braisgf_id;
        var first_breogangf_refuel;
        var third_breogangf_refuel;
        var first_breogangf_vehicle;
        var second_breogangf_vehicle;

        before(function(done) {
            // In our tests we use the test db
            mongoose.connect(config.mongo.uri + config.mongo.db, function() {
                mongoose.connection.db.dropCollection('refuels', function() {
                    mongoose.connection.db.dropCollection('users', function() {
                    done();
                    });
                });
            });
        });

        after(function(done) {
            mongoose.connection.db.dropCollection('refuels', function() {
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
                    "brand": "Subaru",
                    "model": "WRX sti",
                    "year": 2015,
                    "created_at": 1439736879
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
                    "brand": "Mitsubishi",
                    "model": "Lancer evo X",
                    "year": 2014,
                    "created_at": 1439736889
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    second_breogangf_vehicle = res.body._id;
                    done();
                });
        });

        it('POST /refuel - should create a refuel using breogangf user and first car', function(done) {
            request(config.url)
                .post('/api/refuel')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "date": 1439736879,
                    "gas_price": 9.999,
                    "price_amount": 99.99,
                    "fuel_amount": 99.99,
                    "previous_distance": 999.99,
                    "created_at": 1439736879,
                    "vehicle": first_breogangf_vehicle
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    first_breogangf_refuel = res.body._id;
                    done();
                });
        });

        it('POST /refuel - should create a second refuel using breogangf user and second car', function(done) {
            request(config.url)
                .post('/api/refuel')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "date": 1439736855,
                    "gas_price": 5.5555,
                    "price_amount": 55.55,
                    "fuel_amount": 55.55,
                    "previous_distance": 555.55,
                    "created_at": 1439736855,
                    "vehicle": second_breogangf_vehicle
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('POST /refuel - should create a third refuel using breogangf user and second car', function(done) {
            request(config.url)
                .post('/api/refuel')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "date": 1439736877,
                    "gas_price": 7.777,
                    "price_amount": 77.77,
                    "fuel_amount": 77.77,
                    "previous_distance": 777.77,
                    "created_at": 1439736877,
                    "vehicle": second_breogangf_vehicle
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    third_breogangf_refuel = res.body._id;
                    done();
                });
        });        

        it('POST /refuel - should create a refuel using braisgf user', function(done) {
            request(config.url)
                .post('/api/refuel')
                .set('Authorization', 'Basic YnJhaXNnZjpCcmFpczIwMTU=')
                .send({
                    "date": 1439736878,
                    "gas_price": 8.888,
                    "price_amount": 88.88,
                    "fuel_amount": 88.88,
                    "previous_distance": 888.88,
                    "created_at": 1439736878,
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('PUT /refuel/id - should update first breogangf\'s refuel', function(done) {
            request(config.url)
                .put('/api/refuel/' + first_breogangf_refuel)
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "date": 1439736869,
                    "gas_price": 9.9969,
                    "gas_station": 'Cepsa Porto do son',
                    "price_amount": 9969.69,
                    "fuel_amount": 9969.69,
                    "previous_distance": 999.69,
                    "created_at": 1439736869,
                    "vehicle": first_breogangf_vehicle
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('previous_distance', 999.69);
                    res.body.should.have.property('fuel_amount', 9969.69);
                    done();
                });
        });

        it('DELETE /refuel/id - should delete the third refuel created by breogangf', function(done) {
            request(config.url)
                .del('/api/refuel/' + third_breogangf_refuel)
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .end(function(err, res) {
                    done();
                });
        });

        it('GET /refuel - should return all the refuels created by breogangf', function(done) {
            request(config.url)
                .get('/api/refuel/')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    res.body.should.have.length(2);
                    res.body[0].should.have.property('fuel_amount', 9969.69);
                    res.body[0].vehicle.should.have.property('brand', 'Subaru');
                    res.body[0].vehicle.should.have.property('model', 'WRX sti');
                    res.body[1].should.have.property('fuel_amount', 55.55);
                    res.body[1].vehicle.should.have.property('brand', "Mitsubishi");
                    res.body[1].vehicle.should.have.property('model', "Lancer evo X");
                    done();
                });
        });

    });
});