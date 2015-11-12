/**
 * Created by fx on 12/11/15.
 */

var assert = require('assert');
var api;
var ServerNotFoundException = require('../backend/services/mongo-service').ServerNotFoundException;
var InvalidUrlException = require('../backend/services/mongo-service').InvalidUrlException;
var NotConnectedException = require('../backend/services/mongo-service').NotConnectedException;

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
                console.log(api);
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

        it('should not get dbs', function () {
            api.getDbs({}, {}, function (err, data) {
                assert(err instanceof NotConnectedException, 'db should not be connected: ' + err);
            })
        });

        it('should get dbs', function () {
            api.login({body: {url: '127.0.0.1', port: 27017}}, {}, function (err, res) {
                if (err) throw err;
                api.getDbs({}, {}, function (err, data) {
                    if (err) throw err;
                    assert(data, 'Data should not be undefined');
                })
            });

        });
    });
});