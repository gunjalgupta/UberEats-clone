const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
//const { auth } = require("../passport");
const { secret } = require("../passconfig");
const passport = require('passport');
//auth();

//exports.UserSignUp = (req, res) =>
router.post("/api/register", (req, res) => {
	console.log("in");
	req.body.path = "register";
	kafka.make_request("rsignup", req.body, (err, result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else if (result === 299) {
			
			res.status(299).send({message:"Acoount with this email already exists"})
		} else {
			const payload = { email: result.email, role: "resturant" };
			const token = jwt.sign(payload, secret, {
				expiresIn: 1008000,
			});
			result.token = "JWT " + token;
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//==========================================================

router.post("/api/login",  (req, res) => {

	req.body.path = "login";
	kafka.make_request("rsignup", req.body, (err, result) => {
		console.log("result is:", result);
		if (err) {
			console.log(err);
		} else {
			if (result === 500) {
				res.status(500).send({message:"Server Error"})
			} else if (result === 207) {
				
				res.status(207).send({message:"Account not found"})
			} else if (result === 209) {
				
				res.status(500).send({message:"Incorrect Password"})
			} else {
				const payload = { _id: result._id };
				const token = jwt.sign(payload, secret, {
					expiresIn: 1008000,
				});
				//req.session.user = result;
				result.token = "JWT " + token;
				// res.cookie("cookie", result.username, {
				// 	maxAge: 900000,
				// 	httpOnly: false,
				// 	path: "/",
				// });
				res.writeHead(200, {
					"Content-Type": "applicaton/json",
				});
				res.end(JSON.stringify(result));
			}
		}
	});
});
//===========================
router.get("/api/profile/:restaurantId", (req, res) => {
	console.log("in");
	req.body.path = "restaurantProfile";
	req.body.restaurantId= req.params.restaurantId;

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//=============================================================

router.post("/api/profile/updatedetails/",(req, res) => {
	console.log("in");
	req.body.path = "restaurantDetails";

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});

//===================================================

router.post("/api/getdish/:restaurantId",(req, res) => {
	console.log("in");
	req.body.path = "getDish";
	req.body.restaurantId= req.params.restaurantId;

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//=============================================================


router.post("/api/adddish/", (req, res) => {
	console.log("in");
	req.body.path = "addDish";
	//req.body.restaurantId= req.params.restaurantId;

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//=============================================================

router.post("/api/editdish/:dishId",(req, res) => {
	console.log("in");
	req.body.path = "editDish";
	req.body.dishId= req.params.dishId;
	//req.body.restaurantId= req.params.restaurantId

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//=============================================================

router.post("/api/deletedish/:dishId",(req, res) => {
	console.log("in");
	req.body.path = "deleteDish";
	req.body.dishId= req.params.dishId;

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//=============================================================

router.post("/api/getd/:dishId/:restaurantId", (req, res) => {
	console.log("in");
	req.body.path = "getDishDetails";
	req.body.restaurantId= req.params.restaurantId;
	req.body.dishId= req.params.dishId;

	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//=============================================================

router.post("/api/key/", (req, res) => {
	console.log("in");
	req.body.path = "restaurantFindKey";
	kafka.make_request("rsignup", req.body, (err,result) => {
		if (result === 500) {
			res.status(500).send({message:"Server Error"})
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result.profilepic));
		}
	});
});


module.exports = router;