/**
 * Created by fx on 10/11/15.
 */

var mongoService = require('../services/mongo-service');
var logger = require('debug')('Mongular2:api');

exports.getDbs = function (req, resp, cb) {
    mongoService.getDbs(req.query, resp, cb);
};

exports.login = function (req, resp, cb) {
    mongoService.login(req.body, cb);
};

exports.logout = function (req, resp, cb) {
    mongoService.logout(cb);
};

exports.getCollections = function (req, resp, cb) {
    mongoService.getCollections(req.query, cb);
};