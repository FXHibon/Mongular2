/**
 * Created by fx on 11/11/15.
 */

var mongoClient = require('mongodb').MongoClient;
var logger = require('debug')('Mongular2:MongoService');
var currentDb = undefined;


// EXCEPTIONS;

/**
 * Exception when url format is not valid
 * @param address
 * @constructor
 */
exports.InvalidUrlException = function (address) {
    this.message = address + ' is not a valid url';
    this.toString = function () {
        return this.message;
    };
};

/**
 * Exception when mongo server is not found
 * @param err
 * @constructor
 */
exports.ServerNotFoundException = function (err) {
    this.message = 'Server not found: ' + err;
    this.toString = function () {
        return this.message;
    };
};

/**
 * Exception when asking for operation that need to be connected
 * @constructor
 */
exports.NotConnectedException = function () {
    this.message = 'You must be connected in order to perform this operation';
    this.toString = function () {
        return this.message;
    };
};

/**
 * Exception when invalid parameter
 * @constructor
 */
exports.InvalidParameterException = function (msg) {
    this.message = 'Invalid parameter for asked operation: ' + msg;
    this.toString = function () {
        return this.message;
    };
};

// Private Methods

/**
 * Parse given url object
 * @param req Object {url:string, port:number}
 * @returns {string|undefined}
 * @private
 */
var _parse = function (req) {
    if (req.url && req.port) {
        return 'mongodb://' + req.url + ':' + req.port;
    }
    return undefined;
};

/**
 * Connect to given database
 * @param req Database address
 * @param cb Callback
 * @private
 */
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

// public Methods

/**
 * List databases for current db, if any
 * @param req
 * @param resp
 * @param cb Callback
 */
exports.getDbs = function (req, resp, cb) {
    if (currentDb) {
        currentDb.admin().listDatabases(function (err, data) {
            if (err) {
                logger(err);
            } else {
                logger(data);
            }
            cb(null, data.databases);
        });
    } else {
        cb(new exports.NotConnectedException());
    }
};

/**
 * Connect to given database url
 * @param req Database url {url:string, port:number}
 * @param cb Callback
 */
exports.login = function (req, cb) {
    if (currentDb) {
        currentDb.close(function () {
            _connect(req, cb);
        });
    } else {
        _connect(req, cb);
    }
};

/**
 * Disconnect from current database, if any
 * @param cb Callback
 */
exports.logout = function (cb) {
    if (currentDb) {
        currentDb.close();
        currentDb = null;
        cb(null, {});
    } else {
        cb(new exports.NotConnectedException());
    }
};

/**
 * List collections for given db, if connected
 * @param req Db name {dbName:string}
 * @param cb Callback
 */
exports.getCollections = function (req, cb) {
    console.log(req);
    if (currentDb) {
        var db = req.dbName;
        if (db) {
            console.log(db);
            currentDb.open(db, function (err, db) {
                console.log(err);
                if (err) {
                    cb(Error('Can not open given db: ' + err));
                } else {
                    db.listCollections().toArray(function (err, items) {
                        if (err) {
                            cb(Error('Unexpected error: ' + err));
                        } else {
                            logger(items);
                            cb(null, []);
                        }
                    });
                }
            });
        } else {
            cb(new exports.InvalidParameterException('dbName = ' + db));
        }

    } else {
        cb(new exports.NotConnectedException());
    }
};