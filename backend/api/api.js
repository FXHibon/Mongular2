/**
 * Created by fx on 10/11/15.
 */

var mongoService = require('../services/mongo-service');
var logger = require('debug')('Mongular2:api');

module.exports.getDbs = function (req, resp, cb) {
    mongoService.getDbs(req, resp, cb);
};

module.exports.login = function (req, resp, cb) {
    logger('Body: ', req.body);
    logger('Params: ', req.params);
    mongoService.login(req, resp, cb);
};