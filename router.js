var express = require('express');
var app = express();
var img = require('./src/image.js');
//var face = require('./src/face.js');
//var blob = require('./src/blob.js');

app.get('/image',img.imageRoute);
//app.get('/face',face.faceRoute)
var server = app.listen(3000,function(){
	var host = '127.0.0.1';
	var port = server.address().port;
	console.log('Example app listen at http://%s:%s',host,port);
	
});