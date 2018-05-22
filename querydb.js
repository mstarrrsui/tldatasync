const ADODB = require('node-adodb');



queryDB = function(filename) {

    console.log(`Querying the DB in file ${filename}`);


    const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${filename}`);
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
 
module.exports.queryDB = queryDB 




