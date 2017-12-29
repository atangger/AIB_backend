var express = require('express');
var app = express();
var img = require('./src/image.js')

app.get('/image',img.imageRoute);

var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listen at http://%s:%s',host,port);
});