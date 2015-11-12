/**
 * Created by fx on 11/11/15.
 */

var mongoClient = require('mongodb').MongoClient;
var logger = require('debug')('Mongular2:MongoService');
var currentDb;


// EXCEPTIONS;

exports.InvalidUrlException = function (address) {
    this.message = address + ' is not a valid url';
    this.getMessage = function () {
        return this.message;
    };
};

exports.ServerNotFoundException = function (err) {
    this.message = 'Server not found: ' + err;
    this.getMessage = function () {
        return this.message;
    };
};


exports.getDbs = function (req, resp, cb) {
    if (currentDb) {
        currentDb.admin().listDatabases(function (err, data) {
            if (err) {
                logger(err);
            } else {
                logger(data);
            }
            cb([{name: 'Db1'}]);
        });
        cb(200, [{name: 'Db1'}]);
    } else {
        cb(403, {msg: 'Not connected'})
    }
};

function _parse(req) {
    logger(req);
    if (req.url && req.port) {
        return 'mongodb://' + req.url + ':' + req.port;
    }
    return undefined;
}


var _connect = function (req, cb) {
    var address = _parse(req);

    logger('Trying to connect to ', address);
    if (!address) {
        cb(new exports.InvalidUrlException(address));
        return;
    }

    mongoClient.connect(address, function (err, db) {
        if (err) {
            cb(new exports.ServerNotFoundException(err));
        } else {
            currentDb = db;
            cb(null, {});
        }
    });
};

exports.login = function (req, cb) {
    if (currentDb) {
        currentDb.close(function () {
            _connect(req, cb);
        });
    } else {
        _connect(req, cb);
    }
};