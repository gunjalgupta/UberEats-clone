"use strict";
const bcrypt = require("bcrypt");
const Restaurants = require("../models/restaurant");
const saltRounds = 10;

function register(msg, callback) {
	const { rname } = msg;
	const { email } = msg;
	const { pwd } = msg;

	Restaurants.find({ email }, (err, results) => {
		if (err) {
			console.log(err);
			callback(null, 500);
		}
		if (results.length > 0) {
			console.log(`Email ${email} already exists`);
			callback(null, 299);
		} else {
			bcrypt.hash(pwd, saltRounds, (error, hash) => {
				if (error) {
					console.log(error);
					callback(null, "Hashing Error");
				}

				let userToCreate = Restaurants({
					email: email,
					pwd: hash,
					rname: rname,
				});

				userToCreate.save((error) => {
					if (error) {
						console.log(`Saving Error in Signup: ${error}`);
						callback(null, 500);
					}
					//console.log("Id of inserted document after:", userToCreate._id);
					console.log("Successfully Created");
					let userToSend = {
						email: email,
						rname: rname,
						//customerId: userToCreate._id,
					};
					callback(null, userToSend);
				});
			});
		}
	});
}


function login(message, callback) {
	console.log("inside handle req", message.email);
	let emailId = message.email;
	console.log("EmailId is:", emailId);

	Restaurants.findOne({ email: emailId }, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else if (user === null) {
			callback(null, 207);
		} else {
			bcrypt.compare(message.pwd, user.pwd, (err, isPasswordTrue) => {
				if (err) {
					callback(null, 500);
				} else {
					if (isPasswordTrue) {
						let userData = {
							restaurantId: user.restaurantId,
							email: user.email,
						};
						callback(null, userData);
					} else {
						callback(null, 209);
					}
				}
			});
		}
	});

}
//=======================================================


function handle_request(msg, callback) {
	console.log(msg);
	if (msg.path === "login") {
	  delete msg.path;
	  login(msg, callback);
	} 
	if (msg.path === "register") {
		delete msg.path;
		register(msg, callback);
	  } 
  }

exports.handle_request = handle_request;