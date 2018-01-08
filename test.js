var request = require('request');
var apiUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0';
var imgUrl = 'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';
var key = '3b8861a4b8024584a73d1d28cc496279';

var params = {
            "language": "en"
};
var header = {
		 "Content-type": "application/json",
		 "Ocp-Apim-Subscription-Key" : key
};
var resource = {"url": "http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"};
var options = {
        url: "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze",
        method: "POST",
        qs: params,
        headers: header,
      	body: JSON.stringify(resource)
};

request(options,function(error,response,body){
    	if(!error && response.statusCode ==200){
    		console.log("get correct response = " + JSON.stringify(response));
    	}
})