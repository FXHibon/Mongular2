/**
 * Created by fx on 11/11/15.
 */

var mongoClient = require('mongodb').MongoClient;
var logger = require('debug')('Mongular2:MongoService');
var currentDb;

exports.getDbs = function (req, resp, cb) {
    cb(200, [{name: 'Db1'}]);
};

function _parse(req) {
    if (req.url && req.port) {
        return 'mongodb://' + req.url + ':' + req.port;
    }
    return undefined;
}
var _connect = function (req, cb) {
    var address = _parse(req);
    if (!address) {
        cb(400, {msg: 'Url format not valid'});
        return;
    }
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
exports.login = function (req, cb) {
    if (currentDb) {
        logger('Should disconnect db');
        currentDb.close(function () {
            _connect(req, cb);
        });
    } else {
        _connect(req, cb);
    }
};