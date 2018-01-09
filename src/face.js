var request = require('request')
var config = require('./config/config.js');
exports.faceRoute = function(req,res){
	var iH = new faceHandler('here should be the key','here should be the url');
	iH.get();
}

function faceHandler(key,imgUrl){
	this.key = key; // the authentication key
	this.imgUrl = imgUrl; // the url of the src img
}

faceHandler.prototype.apiUrl = '';

faceHandler.prototype.get = function() {
	var header = {
		 "Content-type": "application/json",
		 "Ocp-Apim-Subscription-Key" : this.key
	};

	var options = {
        url: this.apiUrl,
        method: "POST",
        headers: header,
      	body: JSON.stringify('{"url": ' + '"' + this.imgUrl + '"}')
      	};

    request(options,function(error,response,body){
    	if(!error && response.statusCode ==200){
    		res.json(JSON.parse(body));
            // 
    	}
    })
};
