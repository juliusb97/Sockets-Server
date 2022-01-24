const express = require("express");
const { exec } = require('child_process');

const app = express();

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

app.listen(6969);