/**
 * Created by fx on 12/11/15.
 */

var assert = require('assert');
var api = require('../backend/api/api');


describe("api", function () {
    describe(".login()", function () {
        it("should connect to 127.0.0.1:27017", function (done) {
            api.login({body: {url: '127.0.0.1', port: 27017}}, {}, function (err, msg) {
                if (err) {
                    assert.fail(err, null, 'login should have been successful')
                }
                done();
            });

        });

        it("should NOT connect to 127.0.0.1:5000", function (done) {
            api.login({body: {url: '127.0.0.1', port: 5000}}, {}, function (err, msg) {
                console.log(api);
                assert(err instanceof api.ServerNotFoundException, 'Server should not have been found');
                done();
            });
        });

        it("should NOT be able to parse this url (port is missing): 127.0.0.1", function (done) {
            api.login({body: {url: '127.0.0.1'}}, {}, function (err, msg) {
                assert(err instanceof api.InvalidUrlException, 'Url should not have been parsed successfuly');
                done();
            });
        });
    });
});