var azure = require('azure-storage');
var config = require("../config/config");
var url = require('url');

var containerName = 'tempcontainer';

exports.blobRoute = function (req, res) {
    var bH = new blobHandler();
    bH.get(res);
}

function blobHandler() {
}

blobHandler.prototype.get = function (res) {

    var blobSvc = azure.createBlobService(config.blob.key1.connString);
    var contianerOptional = azure.BlobService.CreateContainerOptions
    {
        publicAccessLevel = azure.BlobUtilities.BlobContainerPublicAccessType.CONTAINER
    }

    blobSvc.createContainerIfNotExists(containerName, contianerOptional, function (error, request, response) {
        if (!error && response.statusCode == 200) {
            var blobSAS = blobSvc.generateSharedAccessSignature(containerName, '', { Id: 'all' });
            var data = JSON.parse('{}');
            data.SAS = blobSAS;
            var json = JSON.parse('{}');
            json.code = 0;
            json.data = data;
            res.jsonp(json);
        }
    });
};
