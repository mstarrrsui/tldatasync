var fs = require('fs');
var request = require('request');

var downloadwithcb = function(url, dest, success, error) {

    console.log(`Downloading file from ${url} to ${dest}......`)

    var file = fs.createWriteStream(dest);
    var sendReq = request.get(url);

    // verify response code
    sendReq.on('response', function(response) {
        if (response.statusCode !== 200) {
            return error('Response status was ' + response.statusCode);
        }
    });

    // check for request errors
    sendReq.on('error', function (err) {
        fs.unlink(dest);
        return error(err.message);
    });

    sendReq.pipe(file);

    file.on('finish', function() {
        console.log(`Download finished closing file...`)
        file.close(success);  // close() is async, call cb after close completes.
    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return error(err.message);
    });
};

var downloadaspromise = function(url, dest) {
    return new Promise((success,error) => downloadwithcb(url, dest, success, error))
}

module.exports.download = downloadaspromise;
