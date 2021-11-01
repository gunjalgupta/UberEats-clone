"use strict";
const Restaurants = require("../models/restaurant");
const Dish = require("../models/dish");

//======================================================================
function dishKey(message, callback) {
	console.log("inside handle req", message);
	let dishId = message.dishId;
	//let values = message.values;
	console.log("Id is:", dishId);

	Dish.findOne({ dishId: dishId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================
function dishImage(message, callback) {
    console.log("inside handle req", message);
    let dishId = message.dishId;
    let key= message.key;
    console.log("Id is:", dishId);

    Dish.findOneAndUpdate({ dishId: dishId}, {profilepic:key}, function (err, user) {
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
	if (msg.path === "dishFindKey") {
	  delete msg.path;
	  dishKey(msg, callback);
	} 
    if (msg.path === "dishImage") {
        delete msg.path;
        dishImage(msg, callback);
      } 
}

exports.handle_request = handle_request;