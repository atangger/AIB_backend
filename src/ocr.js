var request = require('request');
var url = require('url');
var config = require('../config/config');

exports.ocrRoute = function(req,res,next){
    var params = url.parse(req.url, true).query;
	var iH = new ocrHandler(params.img);
	iH.get(res,next);
}

function ocrHandler(imgUrl){
    this.imgUrl = imgUrl;
	this.key = config.ocr.key1; // the authentication key 
    this.apiUrl = config.ocr.endPoint;
}
ocrHandler.prototype.get = function(res,next) {
    console.log("in the get!!!");

    var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "unk"
        };
	var header = {
		 "Content-type": "application/json",
		 "Ocp-Apim-Subscription-Key" : this.key
	};

    var resource = {"url": this.imgUrl};
	var options = {
        url: this.apiUrl,
        method: "POST",
        qs: params,
        headers: header,
      	body: JSON.stringify(resource)
      	};

    request(options,function(error,response,body){
        console.log("get response!!! statusCode = " + response.statusCode);
        if(error) return next(error);
    	if(!error && response.statusCode ==200){
            var data = JSON.parse(body);
            var json = JSON.parse('{}');
            json.code = 0;
            json.data = data
            res.jsonp(json);
    	}
    })
};