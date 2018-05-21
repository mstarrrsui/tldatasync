var osmosis = require('osmosis');

osmosis.config('follow_set_cookies', true);
osmosis
.get('https://www.twinlakesswimtennis.org/Database/Clubs/TwinLakes_Data.mdb')
.then(function (context, data, next) {
    console.log(context)
    var cookies = context.cookies;
    console.log("cookies:" + JSON.stringify(cookies))
    console.log(data)
})
.log(console.log)
.error(console.log)
.debug(console.log)