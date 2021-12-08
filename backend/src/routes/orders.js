const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const passport = require('passport');

//exports.UserSignUp = (req, res) =>
router.post("/api/getcusorder",(req, res) => {
	console.log("in");
	req.body.path = "getcusorder";
	kafka.make_request("order", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//========================================================
router.post("/api/getcusdetail", (req, res) => {
	console.log("in");
	req.body.path = "getcusorderdetail";
	kafka.make_request("order", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//========================================================
router.post("/api/getresorders/:restaurantId",(req, res) => {
	console.log("in");
	req.body.path = "getresorder";
	req.body.restaurantId= req.params.restaurantId;
	kafka.make_request("order", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//========================================================
router.post("/api/addorder/",(req, res) => {
	console.log("in");
	req.body.path = "addorder";
	kafka.make_request("order", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//========================================================
router.post("/api/adddetails",(req, res) => {
	console.log("in");
	values=req.body
	req.body.path = "addorderdetails";
	kafka.make_request("order", {values:values,path:"addorderdetails"}, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//========================================================
router.post("/api/status",(req, res) => {
	console.log("in");
	req.body.path = "status";
	kafka.make_request("order", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//========================================================


module.exports= router;