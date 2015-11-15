/**
 * Created by fx on 11/11/15.
 */

var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var Collection = require('mongodb').Collection;
var logger = require('debug')('Mongular2:MongoService');


// EXCEPTIONS

/**
 * Exception when url format is not valid
 * @param address
 * @constructor
 */
exports.InvalidUrlException = function (address) {
    this.message = 'Can not build server with ' + JSON.stringify(address);
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
    this.message = 'Server not found: ' + JSON.stringify(err);
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
 * Parse given url object and return corresponding Server instance
 * @param req Object {url:string, port:number}
 * @returns {Server|undefined}
 * @private
 */
var _buildServer = function (req) {
    if (req.url && req.port) {
        return new Server(req.url, req.port);
    }
    return undefined;
};

/**
 * Extract connection string
 * @see https://docs.mongodb.org/manual/reference/connection-string/#standard-connection-string-format
 * @param server Server
 * @return string Connection string
 * @private
 */
var _getConnectionString = function (server) {
    return 'mongodb://' + server.host + ':' + server.port;
};
/**
 * Connect to admin database
 * @param req Database address
 * @param cb Callback
 * @private
 */
var _getAdminDb = function (req, cb) {

    var server = _buildServer(req);
    if (!server) {
        cb(new exports.InvalidUrlException(req));
        return;
    }
    logger('Trying to connect to ', _getConnectionString(server));

    MongoClient.connect(_getConnectionString(server), {native_parser: true}, function (err, adminDb) {
        if (err) {
            cb(new exports.ServerNotFoundException(err));
        } else {
            cb(null, adminDb);
        }
    });
};

// public Methods

/**
 * List databases for given server, if any
 * @param req Request {url:string, port:number}
 * @param resp
 * @param cb Callback
 */
exports.getDbs = function (req, resp, cb) {
    _getAdminDb(req, function (err, client) {
        if (err) {
            cb(err);
            return;
        }
        client.admin().listDatabases(function (err, res) {
            client && client.close();
            if (err) {
                logger(err);
                cb(err);
            } else {
                logger(res.databases);
                cb(null, res.databases);
            }
        });
    });
};

/**
 * Connect to given database url
 * @param req Database url {url:string, port:number}
 * @param cb Callback
 */
exports.login = function (req, cb) {
    _getAdminDb(req, function (err, res) {
        res && res.close();
        if (err) {
            cb(err);
            return;
        }
        cb(null, {});
    });
};

/**
 * List collections for given db, if connected
 * @param req Db name {dbName:string}
 * @param cb Callback
 */
exports.getCollections = function (req, cb) {

    var dbName = req.dbName;

    if (!dbName) {
        cb(new exports.InvalidParameterException('dbName = ' + dbName));
        return;
    }

    var server = _buildServer(req);
    if (!server) {
        cb(exports.InvalidUrlException(req));
        return;
    }

    var db = new Db(dbName, server);
    db.open(function (err, db) {
        if (err) {
            cb(Error('Can not open given db' + err.toString()));
            return;
        }

        db.listCollections().toArray(function (err, collections) {
            db && db.close();
            if (err) cb(err);
            logger(collections);
            cb(null, collections);
        });

    });
};

exports.getDocuments = function (req, cb) {
    var collectionName = req.collectionName;
    if (!collectionName) {
        cb(new exports.InvalidParameterException('collectionName not defined'))
        return;
    }

    var dbName = req.dbName;
    if (!dbName) {
        cb(new exports.InvalidParameterException('dbName not defined'));
        return;
    }

    var server = _buildServer(req);
    if (!server) {
        cb(exports.InvalidUrlException(req));
        return;
    }

    var db = new Db(dbName, server);
    db.open(function (err, db) {
        if (err) {
            cb(new exports.ServerNotFoundException('Can\'t connect to server'));
            return;
        }

        db.collection(collectionName, function (err, collection) {
            if (err) {
                cb(new exports.InvalidParameterException('Can not open given collection:' + collectionName));
                return;
            }

            collection.find().toArray(function (err, docs) {
                db && db.close();
                cb(null, docs
                    .map(function (doc) {
                        return {data: doc};
                    }));
            });

        });
    });

};