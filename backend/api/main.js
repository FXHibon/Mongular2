/**
 * Created by fx on 10/11/15.
 */

var mongoService = require('../services/mongo-service');

module.exports.getDbs = function (req, resp) {
    mongoService.getDbs(function (data) {
        resp.end(JSON.stringify(data))
    })
};

module.exports.login = function (req, resp) {
    var login = {};
    console.log('LOGIN');
    console.log(req);
    mongoService.login(login, function () {
        resp.send();
    });
};