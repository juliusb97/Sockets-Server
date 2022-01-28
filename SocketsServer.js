const express = require("express");
const fs = require("fs");
const { exec } = require('child_process');
const { env } = require("process");
const https = require("https");
const path = require("path");

const app = express();

function log(msg, type) {
	
	const output = `[${new Date().toISOString()}] ${msg}`;
	
	if(type == "error")
		console.error(output);
	else if(type == "warn")
		console.warn(output);
	else console.log(output);
}

let config;
let useHttps = false;
const credentials = { key: null, cert: null, passphrase: null };

/**
 * Read config
 */
try {
	config = JSON.parse(fs.readFileSync(path.join(__dirname, `/config/config.json`)));

	if(Object.prototype.hasOwnProperty.call(config, "key")) {
		useHttps = true;

		credentials.key = fs.readFileSync(path.join(__dirname, config.key));
		credentials.cert = fs.readFileSync(path.join(__dirname, config.cert));
		credentials.passphrase = config.passphrase;

		log(`Set up HTTPS configuration, server listening on ${HTTPSPORT}`);
	} else {
		log("HTTPS configuration not set correctly, not using HTTPS", "warn");
	}

} catch(e) {
	log("Could not read config.json. Exiting.", "error");
	process.exit(1);
}

const PORT = 6800 || config.port || env.PORT;
const HTTPSPORT = 6443 || config.httpsPort || env.PORT;


log(`Started ${process.argv[1]} at port ${PORT}`);

/**
 * Log
 */
app.use((req, res, next) => {
	log(`Received request from ${req.ip} for url ${req.url}`);
	next();
});

/**
 * CORS handling
 */
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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

	//Basic injection prevention
	if(parseInt(req.params.socketNo) == NaN || parseInt(req.query.action) == NaN)
		return;

	exec(`/home/pi/SocketControl ${req.params.socketNo} ${req.query.action}`, (i,j,k)=>{return;});

	res.status(200).send(`Turned socket ${req.params.socketNo} ${req.query.action == "1" ? "on" : "off"}\r\n`);

});

/**
 * HTTP Server
 */
app.listen(PORT);


/**
 * HTTPS Server
 */
if(useHttps) {
	const httpsServer = https.createServer(config.credentials, app);
	httpsServer.listen(HTTPSPORT);
}