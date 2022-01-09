var http = require('http');
var url = require('url');
const { exec } = require('child_process');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  
  console.log(query["action"]);
  
  if(query["action"] == "turnon"){
	res.end("An");
  } else if(query["action"] == "turnoff"){
  	res.end("Aus");
  } else res.end("Fehler");

}).listen(6969);
