var request = require('request')

exports.imageRoute = function(req,res){
	var iH = new imageHandler('http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg');
	iH.get(res);
}

function imageHandler(imgUrl){
    this.imgUrl = imgUrl;
	this.key = '3b8861a4b8024584a73d1d28cc496279'; // the authentication key // the url of the src img
    this.apiUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze';
}
imageHandler.prototype.get = function(res) {
    console.log("in the get!!!");
    
    var params = {
            "visualFeatures": "Categories,Description,Color",
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
        console.log("the message = " + JSON.stringify(response));
    	if(!error && response.statusCode ==200){
    		res.json(JSON.parse(body));
            // 
    	}
    })
};