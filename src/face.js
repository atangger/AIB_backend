var request = require('request');
var config = require('../config/config');

exports.faceRoute = function (req, res) {
	var fH = new faceHandler(req.body.img);
	fH.get(res);
}

function faceHandler(imgUrl) {
	this.imgUrl = imgUrl; // the url of the src img
}

faceHandler.prototype.apiUrl = config.face.endPoint + '/detect' +
	'?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise';

faceHandler.prototype.get = function (res) {
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
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			var json = JSON.parse('{}');
			json.code = 0;
			json.data = data
			res.json(json);
		}
	});
};
