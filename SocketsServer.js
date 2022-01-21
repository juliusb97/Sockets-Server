const express = require("express");
const { exec } = require('child_process');

const app = express();

/**
 * Root-Route, only provides info
 */
app.get("/", (req, res) => {

	res.write("Socket-Server\r\n");
	res.write("usage: /:socketNo?action=[1|0]\r\n");

	res.status(200).send();

});

/**
 * Switch individual socket
 */
app.get("/:socketNo", (req, res) => {

	exec(`/home/pi/SocketControl ${req.params.socketNo} ${req.query.action}`, (i,j,k)=>{return;});

	res.status(200).send(`Turned socket ${req.params.socketNo} ${req.query.action == "1" ? "on" : "off"}\r\n`);

});

app.listen(6969);

// var http = require('http');
// var url = require('url');
// const { exec } = require('child_process');
// const execSync = require("child_process").execSync;

// http.createServer(function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.writeHead(200, {'Content-Type': 'text/plain'});

//   var url_parts = url.parse(req.url, true);
//   var query = url_parts.query;
  
//   console.log(query["action"]);

//   //turnon: 	Turn all sockets on
//   //turonoff: 	Turn all socket off
//   //on:		Turn specific socket on
//   //off:	Turn specific socket off
//   //action:	any other actions (only raspi CPU temp right now)
  
//   if(query["action"] == "turnon"){
// 	res.end("An");
// 	exec("/home/pi/SocketControl -on", (i,j,k)=>{return;});
//   } else if(query["action"] == "turnoff"){
// 	exec("/home/pi/SocketControl -off", (i,j,k)=>{return;});
//   	res.end("Aus");
//   } else if(query["action"]=="on"){
// 	let socketNo = -1;
// 	try{
// 		socketNo = parseInt(query["no"])
// 	} catch(e){
// 		res.end(e);
// 	}
// 	exec("/home/pi/SocketControl " + parseInt(query["no"]) + " 1", (i,j,k)=>{return;});
// 	res.end("Turned on socket no " + socketNo);
//   } else if(query["action"]=="off"){
// 	let socketNo = -1;
// 	try{
// 		socketNo = parseInt(query["no"])
// 	} catch(e){
// 		res.end(e);
// 	}
// 	exec("/home/pi/SocketControl " + parseInt(query["no"]) + " 0", (i,j,k)=>{return;});
// 	res.end("Turned on socket off " + socketNo);
//   } else if(query["action"]== "check_temp"){
//   	var cpuTemp = execSync("vcgencmd measure_temp");
// 	cpuTemp = cpuTemp.toString();
// 	cpuTemp = cpuTemp.slice(5);
// 	cpuTemp = cpuTemp.replace(".", ",");
// 	cpuTemp = cpuTemp.replace("C", "Grad");
// 	res.end(cpuTemp);
//   } else res.end("Fehler");

// }).listen(6969);