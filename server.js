var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
var env2 = require('env2')('./config.env');
var redis = require('./redis.js');
var index = fs.readFileSync(__dirname + '/index.html');

function handler(req, res) {
    var url = req.url;
    if (url === '/') {
        console.log('wasssssuuppp');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(index);
    }
    else if (url.indexOf('/getTimes') > -1) {
        console.log('aaaweatsetreara');
        redis.displayDb(function (reply) {
            if(reply){
                res.writeHead(200, { 'Content-Type': 'text/html' });
                var testString = JSON.stringify(reply);
                res.end( testString );
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end();
            }
        });
    }
    else if ( url.indexOf('/newTime') > -1 ){
        console.log(url);
        var params  = url.split('?')[1].split('&');
        var name    = params[0].replace('name=','');
        var time    = params[1].replace('time=','');
        redis.addToDb( name, time );
    }
    else {
        if(url.indexOf('.') > -1 ){
            var ext = url.split('.')[1];
            // var filename = url.split('.')[0];
            res.writeHead(200, { "Content-Type" : "text/"+ext });
            var file = fs.readFileSync(__dirname + url );
            res.end(file);
        }
    }
}

var server = http.createServer(handler);

server.listen(port);
console.log("your server is ready at " + port);
