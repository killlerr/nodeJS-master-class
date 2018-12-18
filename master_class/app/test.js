var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');

function doHomework(subject, callback) {
    callback();
    console.log(`Starting my ${subject} homework.`);
  }
  
  doHomework('math', function(){
    var str = "Apple, Banana, Kiwi";
    var res = str.slice(7, 13);
    console.log(res)
  });
