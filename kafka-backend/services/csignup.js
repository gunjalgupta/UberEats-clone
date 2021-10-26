"use strict";
const bcrypt = require("bcrypt");
const Customers = require("../models/customer");
const Restaurants = require("../models/restaurant");
const Favourites = require("../models/favourite");
const Dish = require("../models/dish");
const saltRounds = 10;

function register(msg, callback) {
	const { cname } = msg;
	const { email } = msg;
	const { pwd } = msg;

	Customers.find({ email }, (err, results) => {
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

				let userToCreate = Customers({
					email: email,
					pwd: hash,
					cname: cname,
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
						cname: cname,
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

	Customers.findOne({ email: emailId }, function (err, user) {
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
							customerId: user.customerId,
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
//=======================================================================
function getRestaurants(message, callback) {
	console.log("inside handle req", message);
	let customerId = message.customerId;
	console.log("EmailId is:", customerId);

	Customers.find({ customerId: customerId},{city:1,stateId:1,countryId:1}, function (err, address) {
		//console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);	

		} else {
			console.log("addressc1",address);
      		if(address.city===null){
        		Restaurants.find({},(err,data)=>{
					if (err) {
						callback(null, 500);
					}
          			else {
            			console.log("all",data);
						callback(null, data);
          			}
				})
			}
			else{
				Restaurants.find( { $or: [ { city: address.city }, {stateId : address.stateId },{countryId  : address.countryId }  ] } ,(err, data) => {
					if (err) {
						callback(null, 500);
					}
          			else {
            			console.log("all",data);
						callback(null, data);
          			}
				})
			  }
		}
	});

}
//=============================================================


function searchRestaurant(message, callback) {
	console.log("inside handle req", message);
	let name = message.name;
    let finaldata=[];
	

//Dish
// // .find( {$or: [ {dname: name} , {cuisine: name}]}, (err, ids) => {
// // 	//console.log("ids",ids);
// // 	if (err) {
// // 		callback(null, 500);
// // 	}
// // 	else {
// // 		finaldata.push(ids)
// // 	}

// // })
// .aggregate([

//     { $match: {$or: [ {dname: name} , {cuisine: name}]} },
// 	{
// 		$lookup:
// 		  {
// 			from: "restaurants",
// 			localField: "restaurantId",
// 			foreignField: "restaurantId",
// 			as: "fromItems"
// 		  }
// 	 },{
// 		$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
// 	 },
// 	 { $project: { fromItems: 0 } }
	
// 	])
Restaurants.find( { $or: [ { city: name }, {stateId : name },{countryId  : name},{rname  : name},{dname:name},{cuisine:name}   ] } ,(err, data) => {
		if (err) {
			callback(null, 500);
		}
		  else {
			finaldata.push(data)
			console.log("all",finaldata);
			callback(null, data);
		  }
	})
	console.log("data1",finaldata)
	//callback(null, finaldata);
}
//======================================================================


function customerProfile(message, callback) {
	console.log("inside handle req", message.email);
	let customerId = message.customerId;
	console.log("EmailId is:", customerId);

	Customers.findOne({ customerId: customerId}, function (err, user) {
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

function customerDetails(message, callback) {
	console.log("inside handle req", message.values);
	let customerId = message.customerId;
	let values = message.values;
	console.log("Id is:", customerId);

	Customers.findOneAndUpdate({ customerId: customerId}, values, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================


function checkfav(message, callback) {
	console.log("inside handle req", message.customerId);
	let customerId= message.customerId;
	let restaurantId= message.restaurantId;
	Favourites.find({ customerId: customerId, restaurantId: restaurantId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
	
		} else {
			callback(null,user)
		}
	});

}
//======================================================================


function addfav(message, callback) {
	console.log("inside handle req", message);
	let customerId= message.customerId;
	let restaurantId= message.restaurantId;
	var fav = new Favourites({ customerId: customerId, restaurantId: restaurantId})
	fav.save({ customerId: customerId, restaurantId: restaurantId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
	
		} else {
			callback(null,user)
		}
	});

}
//===================================================================
function deletefav(message, callback) {
	console.log("inside handle req", message.customerId);
	let customerId= message.customerId;
	let restaurantId= message.restaurantId;
	var fav = new Favourites({ customerId: customerId, restaurantId: restaurantId})
	Favourites.remove({ customerId: customerId, restaurantId: restaurantId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
	
		} else {
			callback(null,user)
		}
	});

}
//======================================================================
function showfav(message, callback) {
	console.log("inside handle req", message.customerId);
	let customerId= message.customerId;
	// var fav = new Favourites({ customerId: customerId, restaurantId: restaurantId})
	// Favourites.remove({ customerId: customerId, restaurantId: restaurantId}, function (err, user) {
	// 	console.log("user from DB reacibed", user);

	// 	if (err) {
	// 		callback(null, 500);
	
	// 	} else {
	// 		callback(null,user)
	// 	}
	// });

	Restaurants.aggregate([
		{
		   $lookup:
			  {
				 from: "favourites",
				//  localField: "restaurantId",
				//  foreignField: "restaurantId",
				 pipeline:[
					{ $match :
						{$and:[
							{ "customerId" : customerId} ,
							{"restaurantId": "$restaurantId"}
						]} ,},
						{
							$unwind: "$restaurantId",
						  },
				],
				 as: "fromItems"
			 }
		},
		{
			$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
		 },
		 { $project: { fromItems: 0 } }
		//  , function (err, user) {
		// 	console.log("user from DB reacibed", user);
	
		// 	if (err) {
		// 		callback(null, 500);
		
		// 	} else {
		// 		callback(null,user)
		// 	}
		// }
	 ]).then((result)=>{
		callback(null,result)
	 })
	//  .catch((err)=>{
	// 	callback(null, 500);
	//  })

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
	if (msg.path === "getRestaurants") {
		delete msg.path;
		getRestaurants(msg, callback);
	  } 
	if (msg.path === "searchRestaurant") {
		delete msg.path;
		searchRestaurant(msg, callback);
	  } 
	if (msg.path === "customerProfile") {
		delete msg.path;
		customerProfile(msg, callback);
	  } 
	if (msg.path === "customerDetails") {
		delete msg.path;
		customerDetails(msg, callback);
	  } 
	if (msg.path === "checkfav") {
		delete msg.path;
		checkfav(msg, callback);
	  }  
	if (msg.path === "addfav") {
		delete msg.path;
		addfav(msg, callback);
	  }   
	if (msg.path === "deletefav") {
		delete msg.path;
		deletefav(msg, callback);
	  } 
	if (msg.path === "showfav") {
		delete msg.path;
		showfav(msg, callback);
	  } 
  }

exports.handle_request = handle_request;