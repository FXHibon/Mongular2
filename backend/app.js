/**
 * Created by fx on 07/11/15.
 */

var http = require('http');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var port = 3000, app;

app = express();

var api = require('./api/main');
var routes = require('./api/routes.json');

// Middle wares
app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(serveStatic(path.join(__dirname, '../node_modules')));

app.use(morgan('combined'));

// Mapping routes
routes.forEach(function (route) {
    console.log('Mapping route ', route);
    app[route.method]('/api' + route.url, function (req, resp, next) {
        api[route.name](req, resp);
        next();
    });
});

// Start server
http.createServer(app).listen(port, function () {
    console.log('Http server listening on ', port);
});