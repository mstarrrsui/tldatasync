var fs = require('fs');
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

const queryDB = fname => {

    console.log(`Querying the DB in file ${fname}`);


    const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${fname}`);
    const query = `SELECT Households.HouseholdFullName, Households.MemberEmailAddress, Households.MemberFirstName, 
    Households.MemberLastName, Households.CertificateNo, Households.StreetAddress, Households.State, Households.City, Households.Zipcode
    FROM Households
    WHERE (((Households.MemberStatus)="M" 
    Or (Households.MemberStatus)="L" 
    Or (Households.MemberStatus)="D" 
    Or (Households.MemberStatus)="S"))
    AND Households.MemberEmailAddress is not null

    UNION

    SELECT Households.HouseholdFullName, Households.SpouseEmailAddress, 
    Households.SpouseFirstName AS [MemberFirstName], 
    Households.SpouseLastName, Households.CertificateNo, 
    Households.StreetAddress, Households.State, Households.City, Households.Zipcode
    FROM Households
    WHERE (((Households.MemberStatus)="M" 
    Or (Households.MemberStatus)="L" Or (Households.MemberStatus)="D" 
    Or (Households.MemberStatus)="S"))
    AND Households.SpouseEmailAddress is not null

    ORDER BY Households.HouseholdFullName;`

    const p = connection.query(query)
    return p;
}

const onError = (msg) => {
    console.error(msg)
}

const downloadaspromise = function(url, dest) {
    return new Promise((success,error) => downloadwithcb(url, dest, success, error))
}

const downloadAndQuery = () => {
    const filename = 'tldata.mdb' 
    return downloadaspromise('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb',`./${filename}`)
        .then(() => queryDB(filename))
}


module.exports.getTLData = downloadAndQuery;
