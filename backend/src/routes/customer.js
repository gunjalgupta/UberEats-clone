const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
const passport = require('passport');
//require('../passport')(passport)
//const { auth } = require("../passport");
const { secret } = require("../passconfig");
//auth();

//exports.UserSignUp = (req, res) =>
router.post("/api/register", (req, res) => {
	console.log("in");
	req.body.path = "register";
	kafka.make_request("csignup", req.body, (err, result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else if (result === 299) {
			

			res.status(299).send({message:"Email already exists"});
		} else {
			const payload = { email: result.email };
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

router.post("/api/login", (req, res) => {

	req.body.path = "login";
	kafka.make_request("csignup",req.body, (err, result) => {
		console.log("result is:", result);
		if (err) {
			console.log(err);
		} else {
			if (result === 500) {
				
				res.status(500).send({message:"Server Error"});
			} else if (result === 207) {
				
				res.status(207).send({message:"User not found"});
			} else if (result === 209) {
				
				res.status(209).send({message:"Incorrect password"});
			} else {
				const payload = { email: result.email, role:"customer"  };
				const token = jwt.sign(payload, "gunjal_secure_string", {
					expiresIn: 1008000,
				});
				jwt.verify(token, "gunjal_secure_string", function(err, data){
					console.log(err, data);
			   })
				//req.session.user = result;
				console.log("token",token);
				result.token = "Bearer" + token;
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
//=============================================================

router.post("/api/getRestarants/:customerId", (req, res) => {
	console.log("in");
	req.body.path = "getRestaurants";
	req.body.customerId= req.params.customerId;
	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//==========================================================

router.post("/api/searchRestaurant/:customerId",(req, res) => {
	console.log("in");
	req.body.path = "searchRestaurant";
	req.body.customerId= req.params.customerId;
	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//===========================
router.get("/api/profile/:customerId", (req, res) => {
	console.log("in");
	req.body.path = "customerProfile";
	req.body.customerId= req.params.customerId;

	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//===========================================
router.post("/api/profile/updatedetails/", (req, res) => {
	console.log("in");
	req.body.path = "customerDetails";

	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//===========================================

router.post("/api/checkfav", (req, res) => {
	console.log("in",req.body);
	req.body.path = "checkfav";

	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} 
		else if(result.length ===0){
			res.send("failed");
		  }
		  else {
			//console.log(data.length)
			res.send("success");
		  }
	});
});
//===========================================
router.post("/api/addfav",(req, res) => {
	console.log("in");
	req.body.path = "addfav";

	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} 
		else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//===========================================

router.post("/api/deletefav",(req, res) => {
	console.log("in");
	req.body.path = "deletefav";

	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} 
		else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//===========================================
router.post("/api/showfav/:customerId", (req, res) => {
	console.log("in");
	req.body.path = "showfav";
	req.body.customerId= req.params.customerId;

	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} 
		else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//===========================================

router.post("/api/key/",(req, res) => {
	console.log("in");
	req.body.path = "customerFindKey";
	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result.profilepic));
		}
	});
});

//=================================================
router.post("/api/addaddress/",(req, res) => {
	console.log("in");
	req.body.path = "addaddress";
	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
//======================================
router.post("/api/fetchaddress/:customerId",(req, res) => {
	console.log("in");
	req.body.path = "fetchaddress";
	req.body.customerId= req.params.customerId;
	kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			
			res.status(500).send({message:"Server Error"});
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result.address));
		}
	});
});

module.exports = router;