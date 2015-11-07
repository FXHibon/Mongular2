/**
 * Created by fx on 07/11/15.
 */

var http = require('http');
var connect = require('connect');
var path = require('path');
var serveStatic = require('serve-static');

var port = 3000, app;

app = connect().use(serveStatic(path.join(__dirname, '../')))
    .use(serveStatic(path.join(__dirname, '../frontend/bower_components')));
http.createServer(app).listen(port, function () {
    console.log('Http server listening on ', port);
});