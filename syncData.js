const download = require('./utils').download;
const queryDB = require('./querydb').queryDB;
const ADODB = require('node-adodb');


const downloadname = 'tldata3.mdb'



processData = data => {
    data.map( m => console.log( m.MemberLastName ))
}

downloadSuccess = () => {
    queryDB(downloadname)
}

downloadError = (msg) => {
    console.error(msg)
}


download('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb',`./${downloadname}`, downloadSuccess, downloadError);
    




