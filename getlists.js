const axios = require('axios')



const instance = axios.create({
    baseURL: 'https://us18.api.mailchimp.com/3.0',
    timeout: 18000,
    auth: {
        username: 'anystring',
        password: '42c13481f23dab4d1576ad4e07c26aa3-us18'
    }
  });
//a9fd814b6238acb4945e812acb8c22f3


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
    .then(function (response) {
        handleResults(response.data.members);
    })
    .catch(function (error) {
        console.log(error);
    })
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

getTwinlakes();