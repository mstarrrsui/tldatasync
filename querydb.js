const download = require('./utils.js').download;
const ADODB = require('node-adodb');


const downloadname = 'tldata3.mdb'

queryDB = function() {


    const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${downloadname}`);
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

   return (connection.query(query));
}

processData = data => {
    data.map( m => console.log( m.MemberLastName ))
}


download('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb',`./${downloadname}`)
    .then(queryDB)
    .then(processData)
    .catch(msg => console.error(msg))




