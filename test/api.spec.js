/**
 * Created by fx on 12/11/15.
 */

var assert = require('assert');
var ServerNotFoundException = require('../backend/services/mongo-service').ServerNotFoundException;
var InvalidUrlException = require('../backend/services/mongo-service').InvalidUrlException;
var InvalidParameterException = require('../backend/services/mongo-service').InvalidParameterException;

var api;

describe('api', function () {

    describe('.login()', function () {

        beforeEach(function () {
            api = require('../backend/api/api');
        });

        it('should connect to 127.0.0.1:27017', function (done) {
            api.login({body: {url: '127.0.0.1', port: 27017}}, {}, function (err, msg) {
                if (err) {
                    assert.fail(err, null, 'login should have been successful')
                }
                done();
            });

        });

        it('should NOT connect to 127.0.0.1:5000', function (done) {
            api.login({body: {url: '127.0.0.1', port: 5000}}, {}, function (err, msg) {
                assert(err instanceof ServerNotFoundException, 'Server should not have been found');
                done();
            });
        });

        it('should NOT be able to parse this url (port is missing): 127.0.0.1', function (done) {
            api.login({body: {url: '127.0.0.1'}}, {}, function (err, msg) {
                assert(err instanceof InvalidUrlException, 'Url should not have been parsed successfuly');
                done();
            });
        });
    });

    describe('.getDbs()', function () {

        beforeEach(function () {
            api = require('../backend/api/api');
        });

        it('should get dbs', function (done) {
            api.getDbs({query: {url: '127.0.0.1', port: 27017}}, {}, function (err, data) {
                if (err) throw err;
                assert(data, 'Data should not be undefined');
                done();
            });

        });

        it('should not get dbs', function (done) {
            api.getDbs({query: {}}, {}, function (err, data) {
                assert(err instanceof InvalidUrlException, 'Url should not be accepted');
                done();
            });

        });
    });

    describe('.getCollections()', function () {

        beforeEach(function () {
            api = require('../backend/api/api');
        });

        it('should get collections', function (done) {
            api.getCollections({query: {url: '127.0.0.1', port: 27017, dbName: 'test'}}, {}, function (err, data) {
                if (err) throw err;
                done();
            });
        });

        it('should not get collections', function (done) {
            api.getCollections({query: {url: '127.0.0.1', port: 27017}}, {}, function (err, data) {
                assert(err instanceof InvalidParameterException, 'parameter should not have been accepted');
                done();
            });
        });
    });
});