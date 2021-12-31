var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
const hostname = 'localhost';
const port = process.env.PORT;

var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(port, hostname, ()=>{
  console.log(`Server running at http://${hostname}:${port}/`);
});