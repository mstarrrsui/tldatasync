const getTLData = require('./gettldata').getTLData;
const getMemberList = require('./getlists').getMemberList;
const ADODB = require('node-adodb');


//const downloadname = 'tldata3.mdb'



processData = data => {
    data.map( m => console.log( m.MemberLastName ))
}

handleResults = (data) => {
    data.map( m => console.log(`${m.merge_fields['LNAME']} ${m.id} ${m.email_address} ${m.merge_fields['MMERGE5']}`) )
}

const diffLists = (tldata,listdata) => {
    
}


Promise.all([getTLData(),getMemberList()])
    .then( ([tldata,listdata]) => {
        tldata.map( m => console.log( m.MemberLastName ))
        listdata.map( m => console.log(`${m.merge_fields['LNAME']} ${m.id} ${m.email_address} ${m.merge_fields['MMERGE5']}`) )
     })
    .catch( msg => console.error(msg))
    




