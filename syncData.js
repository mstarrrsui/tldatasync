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

function idEqual(a, b) {
    return a.id === b.id;
}
function intersectionWith() {
    var [comp, first, ...others] = [...arguments];
    return first.filter(a => others.every(arr => arr.some(b => comp(a, b))));
}

function notIntersectionWith() {
    var [comp, first, ...others] = [...arguments];
    return first.filter(a => {
        let result = others.every(arr => arr.every(b => !comp(a, b)));
        //console.log("SEARCHING FOR " + a.id + "RESULT: " + result)
        return result
    });
}

const diffLists = ([tldata,listdata]) => {


    // (1) - ADD - find all tldata that are not in the maillist (new twin lakes subscribers)
    // (2) - UPDATE - find all tldata that ARE in the maillist (these will be updates)
    // (3) - DELETE - find all listdata that ARE NOT in the tldata (these are unsubscribes/deletes)

    let adds = notIntersectionWith(idEqual, tldata, listdata);

    let updates = intersectionWith(idEqual, tldata, listdata)

    let deletes = notIntersectionWith(idEqual, listdata, tldata);

    console.log(`ADD COUNT: ${adds.length}  UPDATE COUNT: ${updates.length} DELETES: ${deletes.length}`)
    

}


Promise.all([getTLData(),getMemberList()])
    // .then( ([tldata,listdata]) => {
    //     tldata.map( m => console.log( m.MemberLastName ))
    //     listdata.map( m => console.log(`${m.merge_fields['LNAME']} ${m.id} ${m.email_address} ${m.merge_fields['MMERGE5']}`) )
    //  })

    .then( diffLists )
    .catch( msg => console.error(msg))
    




