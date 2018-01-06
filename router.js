var express = require('express');
var app = express();
var img = require('./src/image.js');
var face = require('./src/face.js');
var blob = require('./src/blob.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/image',img.imageRoute);
app.post('/face', urlencodedParser, face.faceRoute);
app.post('/blob', blob.blobRoute);
var server = app.listen(3000, function () {
	var host = '127.0.0.1';
	var port = server.address().port;
	console.log('Example app listen at http://%s:%s', host, port);
});