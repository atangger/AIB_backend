var request = require('request');
var url = require('url');

exports.imageRoute = function(req,res,next){
    var params = url.parse(req.url, true).query;
	var iH = new imageHandler(params.img);
	iH.get(res,next);
}

function imageHandler(imgUrl){
    this.imgUrl = imgUrl;
	this.key = 'c09a9ff0e8dd4a2cbc3af12560fbb0cf'; // the authentication key 
    this.apiUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze';
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