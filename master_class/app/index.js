/*
* Primary file for the API
*/

//dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string-decoder').StringDecoder;



//the server should request to all requests with a string
var server = http.createServer(function(req,res){ //req contain information what user asking on


    //Get the URL and parse it
    var parsedUrl = url.parse(req.url,true);  //narrow down to req.url   parse.query

    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get the query string as a object
    var queryStringObject = parsedUrl.query;

    //Get th e HTTP method
    var method = req.method.toLowerCase();

    //Get the headers as an object
    var headers = req.headers;

    //Get the payload, if any
    var decoder = new StringDecoder('utf-8');


    //Send the response
    res.end('Hello world');

    //Log the request path
    console.log('Request received on path :' + trimmedPath +' with method:' +method +' with these query string parameters');
    console.log(queryStringObject);
    console.log('Request received with these' + headers);
})



//start server and have it listen on port 3000
server.listen(3000, function(){
    console.log("Server is listening on 3000");
})