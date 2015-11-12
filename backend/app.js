/**
 * Created by fx on 07/11/15.
 */

var http = require('http');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('debug')('Mongular2:app');

var port = 3000, app;

app = express();

var api = require('./api/api');
var routes = require('./api/routes.json');

// TODO: refactor => it should not be here
var InvalidUrlException = require('./services/mongo-service').InvalidUrlException;
var ServerNotFoundException = require('./services/mongo-service').ServerNotFoundException;
var NotConnectedException = require('./services/mongo-service').NotConnectedException;

// Middle wares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Mapping routes
routes.forEach(function (route) {
    logger('Mapping route ', route);
    app[route.method]('/api' + route.url, function (req, resp) {
        api[route.name](req, resp, function (err, res) {
            var code, data;
            if (err) {
                data = err.toString();
                if (err instanceof InvalidUrlException) {
                    code = 400;
                } else if (err instanceof ServerNotFoundException) {
                    code = 404
                } else if (err instanceof NotConnectedException) {
                    code = 403;
                } else {
                    code = 400
                }
            } else {
                code = 200;
                data = res;
            }
            resp.status(code).json(data);
        });
    });
});

// Start server
http.createServer(app).listen(port, function () {
    logger('Http server listening on ', port);
});