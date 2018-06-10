var tldatautils = require('./tldatautils');


const mbrs = `SELECT Households.HouseholdFullName, Households.MemberEmailAddress, Households.MemberFirstName, 
    Households.MemberLastName, Households.CertificateNo, Households.StreetAddress, Households.State, Households.City, Households.Zipcode
    FROM Households
    WHERE (((Households.MemberStatus)="M" 
    Or (Households.MemberStatus)="L" 
    Or (Households.MemberStatus)="D" 
    Or (Households.MemberStatus)="S"))
    ORDER BY Households.MemberLastName;`


tldatautils
    .downloadAndQuery(mbrs)
    .then( data => data.filter( m => !m.CertificateNo))
    .then( data => data.map( m => 
        console.log(`Last Name:${m.MemberLastName}  MemberNum:${m.CertificateNo}  Household:${m.HouseholdFullName}`)))