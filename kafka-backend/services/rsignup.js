"use strict";
const bcrypt = require("bcryptjs");
const Restaurants = require("../models/restaurant");
const Dish = require("../models/dish");
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


function restaurantProfile(message, callback) {
	console.log("inside handle req", message.email);
	let restaurantId = message.restaurantId;
	console.log("EmailId is:", restaurantId);

	Restaurants.findOne({ restaurantId: restaurantId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else if (user === null) {
			callback(null, 207);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================

function restaurantDetails(message, callback) {
	console.log("inside handle req", message.values);
	let restaurantId = message.restaurantId;
	let values = message.values;
	console.log("Id is:", restaurantId);

	Restaurants.findOneAndUpdate({ restaurantId: restaurantId}, values, function (err, user) {
		console.log("user from DB reacibed", user);
    // Restaurants.findOne({ restaurantId: restaurantId}, function (err, user) {
	// 	console.log("user from DB reacibed", user);
		if (err) {
			console.log(err);
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}
//=======================================================


function getDish(message, callback) {
	//console.log("inside handle req", message.email);
	let restaurantId = message.restaurantId;
	console.log("EmailId is:", restaurantId);

	// Restaurants.find({ restaurantId: restaurantId}, function (err, user) {
	// 	console.log("user from DB reacibed", user);

	// 	if (err) {
	// 		callback(null, 500);
	// 	} else if (user === null) {
	// 		callback(null, 207);
	// 	} else {
	// 		callback(null,user)
	// 	}
	// });

    Dish.find({restaurantId:restaurantId},function(err, user ){
        if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
    })

}
//======================================================================
// function addDish(message, callback) {
// 	//console.log("inside handle req", message.email);
// 	//let restaurantId = message.restaurantId;
// 	console.log("EmailId is:", message.dishes.restaurantId);

//     Restaurants.findOneAndUpdate({ restaurantId: message.dishes.restaurantId}, {dishes:message.dishes}, function (err, user) {
// 		console.log("user from DB reacibed", user);
//     // Restaurants.findOne({ restaurantId: restaurantId}, function (err, user) {
// 	// 	console.log("user from DB reacibed", user);
// 		if (err) {
// 			callback(null, 500);
// 		} else {
// 			callback(null,user)
// 		}
// 	});


// }
function addDish(message, callback) {
	//console.log("inside handle req", message.email);
	//let restaurantId = message.restaurantId;
	console.log("EmailId is:", message.dishes.restaurantId);

    var fav = new Dish(message.dishes)
    console.log("favvvv",fav);
	fav.save( function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
            console.log(err);
			callback(null, 500);
	
		} else {
			callback(null,user)
		}
	});

    // Restaurants.findOneAndUpdate({ restaurantId: message.dishes.restaurantId}, {dishes:message.dishes}, function (err, user) {
	// 	console.log("user from DB reacibed", user);
    // // Restaurants.findOne({ restaurantId: restaurantId}, function (err, user) {
	// // 	console.log("user from DB reacibed", user);
	// 	if (err) {
	// 		callback(null, 500);
	// 	} else {
	// 		callback(null,user)
	// 	}
	// });


}


//======================================================================
function editDish(message, callback) {
	//console.log("inside handle req", message.email);
	let dishId = message.dishId;
    let restaurantId= message.restaurantId;
	console.log("ResId is:", dishId);

	Dish.findOneAndUpdate({ dishId: dishId}, message.values, function (err, user) {
		console.log("user from DB ", user);
        //user.save({dishes: message.values})
		if (err) {
			callback(null, 500);
		} else if (user === null) {
			callback(null, 207);
		} else {
			callback(null,user)
		}
	});

    

}
//======================================================================
function deleteDish(message, callback) {
	console.log("inside handle req", message);
    let dishId = message.dishId;
    //let restaurantId= message.restaurantId;
	//console.log("EmailId is:", restaurantId);

	Dish.findOneAndDelete({ dishId: dishId}, function (err, user) {
		console.log("user from DB reacibed", user);
        //user.find({dishes: message.values})
		if (err) {
			callback(null, 500);
		} else if (user === null) {
			callback(null, 207);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================
function getDishDetails(message, callback) {
	//console.log("inside handle req", message.email);
	let dishId = message.dishId;
    let restaurantId= message.restaurantId;
	console.log("EmailId is:", restaurantId);

	Dish.findOne({ dishId: dishId}, function (err, user) {
		console.log("user from DB reacibed", user);
        //user.find({dishes: message.values})
		if (err) {
			callback(null, 500);
		} else if (user === null) {
			callback(null, 207);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================
function restaurantKey(message, callback) {
	console.log("inside handle req", message);
	let restaurantId = message.restaurantId;
	//let values = message.values;
	console.log("Id is:", restaurantId);

	Restaurants.findOne({ restaurantId: restaurantId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================
function resImage(message, callback) {
    //console.log("inside handle req", message.values);
    let restaurantId = message.restaurantId;
    let key= message.key;
    console.log("Id is:", restaurantId);

    Restaurants.findOneAndUpdate({ restaurantId: restaurantId}, {profilepic:key}, function (err, user) {
        console.log("user from DB reacibed", user);

        if (err) {
            callback(null, 500);
        } else {
            callback(null,user)
        }
    });

}
//======================================================================


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
    if (msg.path === "restaurantProfile") {
		delete msg.path;
		restaurantProfile(msg, callback);
	  } 
    if (msg.path === "restaurantDetails") {
		delete msg.path;
		restaurantDetails(msg, callback);
	  }
    if (msg.path === "getDish") {
		delete msg.path;
		getDish(msg, callback);
	  }  
    if (msg.path === "addDish") {
		delete msg.path;
		addDish(msg, callback);
	  }  
    if (msg.path === "editDish") {
		delete msg.path;
		editDish(msg, callback);
	  }  
    if (msg.path === "deleteDish") {
		delete msg.path;
		deleteDish(msg, callback);
	  } 
    if (msg.path === "getDishDetails") {
		delete msg.path;
		getDishDetails(msg, callback);
	  }   
      if (msg.path === "restaurantFindKey") {
		delete msg.path;
		restaurantKey(msg, callback);
	  } 
      if (msg.path === "resimage") {
		delete msg.path;
		resImage(msg, callback);
	  } 
  }

exports.handle_request = handle_request;