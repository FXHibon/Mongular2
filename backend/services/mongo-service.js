/**
 * Created by fx on 11/11/15.
 */

var mongoClient = require('mongodb').MongoClient;

var currentDb;

exports.getDbs = function (cb) {
    console.log(currentDb);
    cb([{name: 'Db1'}]);
};

exports.login = function (cb) {
    mongoClient.connect('mongodb://localhost:27017', function (err, db) {
        if (err) {
            cb(err);
        } else {
            currentDb = db;
        }
    });
};