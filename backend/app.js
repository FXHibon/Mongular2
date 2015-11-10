/**
 * Created by fx on 07/11/15.
 */

var http = require('http');
var connect = require('connect');
var path = require('path');
var serveStatic = require('serve-static');

var port = 3000, app;

app = connect().use(serveStatic(path.join(__dirname, '../dist')))
    .use(serveStatic(path.join(__dirname, '../node_modules')));


var api = require('./api/main');
var routes = require('./api/routes.json');

routes.forEach(function (route) {
    console.log('Mapping route ', route);
    app.use('/api' + route.url, function (req, resp, next) {
        console.log('/api' + route.url);
        api[route.name](req, resp);
        next();
    });
});


http.createServer(app).listen(port, function () {
    console.log('Http server listening on ', port);
});