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
        api[route.name](req, resp, function (code, data) {
            resp.status(code).json(data);
        });
    });
});

// Start server
http.createServer(app).listen(port, function () {
    logger('Http server listening on ', port);
});