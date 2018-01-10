var express = require('express');
//var cors = require('express-cors');
var app = express();
var img = require('./src/image.js');
var face = require('./src/face.js');
var blob = require('./src/blob.js');
var ocr = require('./src/ocr.js');

// app.use(cors({
// allowedOrigins: [
// "microsoft.com",
// ],
// headers: ['Authorization', 'X-Requested-With', 'Content-Type']
// }));

app.get('/image',img.imageRoute);
app.get('/face', face.faceRoute);
app.get('/blob', blob.blobRoute);
app.get('/ocr',ocr.ocrRoute);

var server = app.listen(3000, function () {
	var host = '127.0.0.1';
	var port = server.address().port;
	console.log('Example app listen at http://%s:%s', host, port);
});