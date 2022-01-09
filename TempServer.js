var http = require('http');
var url = require('url');
const execSync = require("child_process").execSync;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  
  console.log(query["action"]);
  var cpuTemp = "Konnte nicht ermittelt werden.";
  
  if(query["action"] == "check_temp"){
	cpuTemp = execSync("/opt/vc/bin/vcgencmd measure_temp");
	cpuTemp = cpuTemp.toString();
	cpuTemp = String(cpuTemp);
	cpuTemp = cpuTemp.slice(5);
	cpuTemp = cpuTemp.replace(".", ",");
	cpuTemp = cpuTemp.replace("C", "Grad");
	res.end(cpuTemp);
  } else res.end("Kein Befehl angegeben.");

}).listen(4242);
