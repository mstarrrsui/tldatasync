const axios = require('axios')



const instance = axios.create({
    baseURL: 'https://us18.api.mailchimp.com/3.0',
    timeout: 18000,
    auth: {
        username: 'anystring',
        password: '42c13481f23dab4d1576ad4e07c26aa3-us18'
    }
  });


function getTwinlakes() {


    axios.get('https://www.twinlakesswimtennis.org/Clubs/TwinLakes/defaultreal.asp?clubtitle=TwinLakes')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMembers() {

    handleResults = (data) => {
        data.map( m => console.log(`${m.merge_fields['LNAME']} ${m.id} ${m.email_address} ${m.merge_fields['MMERGE5']}`) )
    }

    instance.get('/lists/a978269293/members', {
        params: {
            count: 800
        }
    })
    .then( response => response.data.members )
    .then( data => 
        data.map( m => console.log(`${m.merge_fields['LNAME']} ${m.id} ${m.email_address} ${m.merge_fields['MMERGE5']}`) ) 
    )
    .catch(function (error) {
        console.log(error);
    })
}

function getMemberList() {
    console.log('Calling MAILCHIMP API to get mailing list data....')
    return (
        instance.get('/lists/a978269293/members', {
            params: {
                count: 800
            }
        })
        .then(result => result.data.members)
    );
}

function updateMember() {

    handleResults = (data) => {
        data.map( m => console.log(`${m.merge_fields['LNAME']} ${m.id} ${m.email_address} ${m.merge_fields['MMERGE5']}`) )
    }

    instance.get('/lists/a978269293/members', {
        params: {
            count: 800
        }
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
}

module.exports.getMemberList = getMemberList;