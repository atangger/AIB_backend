var request = require('request');
var url = require('url');
var config = require('../config/config');

exports.imageRoute = function(req,res,next){
    var params = url.parse(req.url, true).query;
	var iH = new imageHandler(params.img);
	iH.get(res,next);
}

function imageHandler(imgUrl){
    this.imgUrl = imgUrl;
	this.key = config.cv.key1; // the authentication key 
    this.apiUrl = config.cv.endPoint;
}
imageHandler.prototype.get = function(res,next) {
    console.log("in the get!!!");

    var params = {
            "visualFeatures": "Categories,Description,Color,Adult",
            "details": "",
            "language": "en"
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
        console.log("get response!!! response = " + JSON.stringify(response));
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