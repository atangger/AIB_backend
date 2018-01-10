var request = require('request');
var config = require('../config/config');
var url = require('url');

exports.faceRoute = function (req, res,next) {
	var params = url.parse(req.url, true).query;
	var fH = new faceHandler(params.img);
	fH.get(res);
}

function faceHandler(imgUrl) {
	this.imgUrl = imgUrl; // the url of the src img
}

faceHandler.prototype.apiUrl = config.face.endPoint + '/detect' +
	'?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise';

faceHandler.prototype.get = function (res,next) {
	var header = {
		"Content-type": "application/json",
		"Ocp-Apim-Subscription-Key": config.face.key1
	};

	var options = {
		url: this.apiUrl,
		method: "POST",
		headers: header,
		body: '{"url": ' + '"' + this.imgUrl + '"}'
	};

	request(options, function (error, response, body) {
        if(error) return next(error);
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			var json = JSON.parse('{}');
			json.code = 0;
			json.data = data
			res.jsonp(json);
		}
	});
};
