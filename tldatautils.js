var fs = require('fs');
var md5 = require('md5');
var request = require('request');
const ADODB = require('node-adodb');


const downloadwithcb = function(url, dest, success, error) {
    var file = fs.createWriteStream(dest);

    console.log(`Downloading file from ${url} to ${dest}......`)

    var sendReq = request.get(url);

    // verify response code
    sendReq.on('response', function(response) {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    // check for request errors
    sendReq.on('error', function (err) {
        fs.unlink(dest);
        return error(err.message);
    });

    sendReq.pipe(file);

    file.on('finish', function() {
        console.log(`Download success, closing file.`)
        file.close(success);  // close() is async, call cb after close completes.
    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return error(err.message);
    });
};

const queryDB = (fname,sqlquery) => {

    console.log(`Querying the DB in file ${fname}`);


    const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${fname}`);
    const query = sqlquery;

    const p = connection.query(query)
    return p;
}

const onError = (msg) => {
    console.error(msg)
}

const downloadaspromise = function(url, dest) {
    return new Promise((success,error) => downloadwithcb(url, dest, success, error))
}

const downloadAndQuery = (sqlquery) => {
    const filename = 'tldata.mdb' 
    return downloadaspromise('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb',`./${filename}`)
        .then(() => queryDB(filename,sqlquery))
        //.then( data => data.map( m => ({id: md5(m.MemberEmailAddress.toLowerCase()), ...m })))
}




module.exports.downloadAndQuery = downloadAndQuery;
