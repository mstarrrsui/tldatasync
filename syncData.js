const download = require('./utils').download;
const queryDB = require('./querydb').queryDB;
const ADODB = require('node-adodb');


const downloadname = 'tldata3.mdb'



processData = data => {
    data.map( m => console.log( m.MemberLastName ))
}


downloadWithPromise= (url, dest) => {
    return new Promise( (resolve,reject) => download(url,dest,resolve,reject) )
}


//download('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb',`./${downloadname}`, downloadSuccess, downloadError);
downloadWithPromise('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb',`./${downloadname}`)
    .then(() => queryDB(downloadname))
    .then( processData )
    .catch( msg => console.error(msg))
    




