var client = require('redis').createClient(); //process.env.REDIS_URL

function addToDb (key,value){
    client.HSET('Running times', key, value, function(err,reply){
        if(err) {
            console.log(err);
        }
        else {
            console.log( reply );
        }
    });
}

function displayDb (callback) {
    client.HGETALL('Running times', function (err, reply) {
        if (err) {
            console.log(err);
        }
        else {
            callback(reply);
        }
    });
}


module.exports = {
    displayDb: displayDb,
    addToDb: addToDb
};
