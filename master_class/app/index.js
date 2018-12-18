/*
* Primary file for the API
*/

//dependencies
var http = require('http');
var url = require('url');
// var StringDecoder = require('string-decoder').StringDecoder;
const { StringDecoder } = require('string_decoder');
var config = require('./config');




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
    const decoder = new StringDecoder('utf8');
    var buffer = '';
    //.on request object emits/on the event 'data'
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();

        //Choose the handler this request should go to. If one is not found use the not found handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound;

        //Construct a beautiful data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer

        };

        //route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload){
            //Use the statusCode callback by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            //Use the payload callback by the handler, or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            //Convert payload to a string
            var payloadString = JSON.stringify(payload); //This is the payload handler sending back to user

            //Return the response
            res.setHeader('Content-Type', 'application/json'); //tell postman body content tye is json
            res.writeHead(statusCode);
            res.end(payloadString);

            //Log request path
            console.log('returning this response: ',statusCode,payloadString);
        });
    })


    // //Log the request path
    // console.log('Request received on path :' + trimmedPath +' with method:' +method +' with these query string parameters');
    // console.log(queryStringObject);
    // console.log('Request received with these' + headers);
})



// //start server and have it listen on port 3000
// server.listen(3000, function(){
//     console.log("Server is listening on 3000");
// })
//start server
server.listen(config.port, function(){
    console.log("Server is listening on: " + config.port + " in " + config.envName + " mode");
})


//Define the handlers
var handlers = {};

//Sample handlers
handlers.sample = function(data,callback){
    //Callback a http status code, and a payload object
    callback(406,{'name' : 'sample handler'});

};

//Not found handler
handlers.notfound = function(data,callback){
    //callback status code
    callback(404);
}

//Define a request router
var router = {
    'sample' : handlers.sample
}