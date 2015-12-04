var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('Statistics Test', function() {
    describe('#statistic model()', function() {
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
                    "email": "breogangf@gmail.com",
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

        it('POST /refuel - should create a refuel using breogangf user and first car', function(done) {
            request(config.url)
                .post('/api/refuel')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "date": 1429833600,
                    "gas_price": 1.359,
                    "gas_station": "Cepsa Noal Porto do Son",
                    "price_amount": 68.00,
                    "fuel_amount": 50.03,
                    "previous_distance": 778.3,
                    "vehicle": first_breogangf_vehicle
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    first_breogangf_refuel = res.body._id;
                    res.body.vehicle.should.have.property('brand', 'Subaru');
                    done();
                });
        });

        it('POST /refuel - should create a refuel using breogangf user and first car', function(done) {
            request(config.url)
                .post('/api/refuel')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .send({
                    "date": 1430352000,
                    "gas_price": 1.370,
                    "gas_station": "Cepsa Noal Porto do Son",
                    "price_amount": 74.00,
                    "fuel_amount": 54.02,
                    "previous_distance": 846.5,
                    "vehicle": first_breogangf_vehicle
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    first_breogangf_refuel = res.body._id;
                    res.body.vehicle.should.have.property('brand', 'Subaru');
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

                    res.body[0].should.have.property('date', 1429833600);
                    res.body[0].should.have.property('gas_price', 1.359);
                    res.body[0].should.have.property('gas_station', "Cepsa Noal Porto do Son");
                    res.body[0].should.have.property('price_amount', 68.00);
                    res.body[0].should.have.property('fuel_amount', 50.03);
                    res.body[0].should.have.property('previous_distance', 778.3);
                    res.body[0].vehicle.should.have.property('brand', 'Subaru');
                    res.body[0].vehicle.should.have.property('model', 'WRX sti');

                    res.body[1].should.have.property('date', 1430352000);
                    res.body[1].should.have.property('gas_price', 1.370);
                    res.body[1].should.have.property('gas_station', "Cepsa Noal Porto do Son");
                    res.body[1].should.have.property('price_amount', 74.00);
                    res.body[1].should.have.property('fuel_amount', 54.02);
                    res.body[1].should.have.property('previous_distance', 846.5);
                    res.body[1].vehicle.should.have.property('brand', 'Subaru');
                    res.body[1].vehicle.should.have.property('model', 'WRX sti');

                    done();
                });
        });

        it('GET /statistics - should return all the statistics created by breogangf', function(done) {
            request(config.url)
                .get('/api/statistics/')
                .set('Authorization', 'Basic YnJlb2dhbmdmOkJyZW9nYW4yMDE1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);

                    res.body.should.have.property('cost_per_kilometer', 0.08739434600029036);
                    res.body.should.have.property('fuel_amount_average', 52.025000000000006);
                    res.body.should.have.property('fuel_consumption_average', 6.404841864214181);
                    res.body.should.have.property('gas_price_average', 1.3645);
                    res.body.should.have.property('previous_distance_average', 812.4);
                    res.body.should.have.property('price_amount_average', 71);

                    done();
                });
        });



    });
});