/**
 * Created by fx on 11/11/15.
 */

var mongoClient = require('mongodb').MongoClient;
var logger = require('debug')('Mongular2:MongoService');
var currentDb;

exports.getDbs = function (req, resp, cb) {
    cb(200, [{name: 'Db1'}]);
};

var _connect = function (cb) {
    var address = 'mongodb://localhost:27017';
    logger('connecting to ', address);
    mongoClient.connect(address, function (err, db) {
        if (err) {
            cb(400, err);
        } else {
            currentDb = db;
            cb(200, {});
        }
    });
};
exports.login = function (req, resp, cb) {
    if (currentDb) {
        logger('Should disconnect db');
        currentDb.close(function () {
            _connect(cb);
        });
    } else {
        _connect(cb);
    }
};