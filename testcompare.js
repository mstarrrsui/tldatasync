const queryDB = require('./gettldata').queryDB;
var md5 = require('md5');
const ADODB = require('node-adodb');

function isEqual(a, b) {
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
        console.log("SEARCHING FOR " + a.id + "RESULT: " + result)
        return result
    });
}

queryDB('tldata.mdb')
   .then( data => data.map( m => ({id: md5(m.MemberEmailAddress.toLowerCase()), ...m }) ) )
   .then( data => {
        let invalidmembers = [{ id: '234234'}]
        let results = notIntersectionWith(isEqual,data,invalidmembers)
        //console.log(results)
   } )
