/**
 * Created by fx on 10/11/15.
 */

var mongoService = require('../services/mongo-service');
var logger = require('debug')('Mongular2:api');

module.exports.getDbs = function (req, resp, cb) {
    mongoService.getDbs(req, resp, cb);
};

module.exports.login = function (req, resp, cb) {
    mongoService.login(req.body, cb);
};