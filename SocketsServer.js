const express = require("express");
const { exec } = require('child_process');
const { env } = require("process");

const PORT = 6800 || env.PORT;

const app = express();

function log(msg, type) {
	
	const output = `[${new Date().toISOString()}] ${msg}`;
	
	if(type == "error")
		console.error(output);
	else if(type == "warn")
		console.warn(output);
	else console.log(output);
}

log(`Started ${process.argv[1]} at port ${PORT}`);

/**
 * Log
 */
app.use((req, res, next) => {
	log(`Received request from ${req.ip} for url ${req.url}`);
	next();
});


/**
 * Root-Route, only provides info
 */
app.get("/", (req, res) => {

	res.setHeader("Access-Control-Allow-Origin", "*");

	res.write("Socket-Server\r\n");
	res.write("usage: /:socketNo?action=[1|0]\r\n");

	res.status(200).send();

});

/**
 * Switch individual socket
 */
app.get("/:socketNo", (req, res) => {

	res.setHeader("Access-Control-Allow-Origin", "*");

	//Basic injection prevention
	if(parseInt(req.params.socketNo) == NaN || parseInt(req.query.action) == NaN)
		return;

	exec(`/home/pi/SocketControl ${req.params.socketNo} ${req.query.action}`, (i,j,k)=>{return;});

	res.status(200).send(`Turned socket ${req.params.socketNo} ${req.query.action == "1" ? "on" : "off"}\r\n`);

});

app.listen(PORT);