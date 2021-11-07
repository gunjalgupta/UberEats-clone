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
	let customerId = Number(message.customerId);
	console.log("EmailId is:", customerId);

	Customers.find({ customerId: customerId},{city:1,stateId:1,countryId:1}, function (err, address) {
		//console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);	

		} else {
			console.log("addressc1",address[0]);
			console.log("addressc1",address[0].city);
      		if(address[0].city){
				Restaurants.find( { 
					$or: [ {
						 city :address[0].city 
					}
					//, {stateId: address[0].stateId },{countryId : address[0].countryId } 
				 ] 
				} ,(err, data) => {
					if (err) {
						callback(null, 500);
					}
          			else {
            			console.log("location data",data);
						callback(null, data);
          			}
				})
        		
			}
			else{
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
		}
	});

}
//=============================================================


function searchRestaurant(message, callback) {
	console.log("inside handle req", message);
	let name = message.name;
    let finaldata=[];
	

Dish
.find( {$or: [ {dname: name} , {cuisine: name}]},{restaurantId:1}, async (err, ids) => {
	//console.log("ids",ids);
	if (err) {
		callback(null, 500);
	}
	else {
		console.log("ids",ids)
		await Promise.all(ids.map((id)=>{
			Restaurants.find({restaurantId:id.restaurantId},async (err,rest)=>{
				if (err){
					console.log(err);
					callback(null, 500);
				}
				else{
					console.log("dish",rest)
					finaldata.push(rest[0])
					//callback(null,finaldata)
				}
			})
		}),
		Restaurants.find( {$or: [ {rname: name} , {city: name}, {stateId : name },{countryId  : name}]},  (err, res) => {
					if(err){
						console.log(err);
						callback(null,500);
					}
					else{
						console.log("rest",res)
						res.map((res1)=>{
							finaldata.push(res)
						})
						//finaldata.push(res)
						callback(null,finaldata)
					}
				}))
	}

})
// .then((res)=>{
// 	Restaurants.find( {$or: [ {rname: name} , {city: name}, {stateId : name },{countryId  : name}]},  (err, ids) => {
// 		if(err){
// 			console.log(err);
// 			callback(null,500);
// 		}
// 		else{
// 			console.log("rest",ids)
// 			finaldata.push(ids)
// 		}
// 	})
// }).then((response)=>{

// 	callback(null, finaldata);
// }
// ).catch((err)=>{console.log(err)})


//await console.log("data1",finaldata)
//await 
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
// Restaurants.find( { $or: [ { city: name }, {stateId : name },{countryId  : name},{rname  : name},{dname:name},{cuisine:name}   ] } ,(err, data) => {
// 		if (err) {
// 			callback(null, 500);
// 		}
// 		  else {
// 			finaldata.push(data)
// 			console.log("all",finaldata);
// 			callback(null, data);
// 		  }
// 	})
	
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
	let customerId = Number(message.customerId);
	let values = message.values;
	console.log("Id is:", customerId);
	try{
	Customers.findOneAndUpdate({ customerId: customerId}, values, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			console.log(err)
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});
}
catch(err){
	console.log(err);
}

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
	let customerId= Number(message.customerId);

	let restaurantId= Favourites.restaurantId
	// Restaurants.aggregate([
	// 	{
	// 	   $lookup:
	// 		  {
	// 			 from: "favourites",
	// 			//  localField: "restaurantId",
	// 			//  foreignField: "restaurantId",
	// 			 pipeline:[
	// 				{ $match :
	// 					{$and:[
	// 						{ "customerId" : customerId} ,
	// 						{"restaurantId": restaurantId}
	// 					]} ,},
	// 					{
	// 						$unwind: "$restaurantId",
	// 					  },
	// 			],
	// 			 as: "fromItems"
	// 		 }
	// 	},
	// 	{
	// 		$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
	// 	 },
	// 	 { $project: { fromItems: 0 } }
	//  ]).then((result)=>{
	// 	callback(null,result)
	//  })
	//  .catch((err)=>{
	// 	callback(null, 500);
	//  })
	Restaurants.aggregate([
		{$lookup:{
			from: "favourites",
			localField:"restaurantId",
			foreignField : "restaurantId",
			as:"table2" 
		}},
		{$unwind:"$table2"},
		// { "$redact": { 
		// 	"$cond": [
		// 		{ "$eq": [ "$table2.customerId", customerId ] }, 
		// 		"$$KEEP", 
		// 		"$$PRUNE"
		// 	]
		// }},
		//{$match: {"table2.customerId" : customerId}},
		{$match: {$expr :{ $eq: [ "$table2.customerId", customerId] }}},
		//{$project: {table2:0}}

	]).then((result)=>{
		console.log("--------------------------",result);
		 	callback(null,result)
		  })
}
//============================

	function cusImage(message, callback) {
			console.log("inside handle req", message.values);
			let customerId = message.customerId;
			let key= message.key;
			console.log("Id is:", customerId);
		
			Customers.findOneAndUpdate({ customerId: customerId}, {profilepic:key}, function (err, user) {
				console.log("user from DB reacibed", user);
		
				if (err) {
					callback(null, 500);
				} else {
					callback(null,user)
				}
			});
		
		}
//======================================================================
function customerKey(message, callback) {
	console.log("inside handle req", message.values);
	let customerId = message.customerId;
	//let values = message.values;
	console.log("Id is:", customerId);

	Customers.findOne({ customerId: customerId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}
//======================================================================
function addaddress(message, callback) {
	console.log("inside handle req", message);
	let customerId = message.customerId;
	//let values = message.values;
	console.log("Id is:", customerId);

	// const cus = Customers.findOne({ customerId: customerId});
	// console.log(cus);
	// cus.save({address:message }, function (err, user) {
	// 	console.log("user from DB reacibed", user);

	// 	if (err) {
	// 		callback(null, 500);
	// 	} else {
	// 		callback(null,user)
	// 	}
	// });
	Customers.updateOne({customerId:customerId}, {
		$addToSet:{
			address: message
		}
	}, (err, user)=>{
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
	})

}
//======================================================================
function fetchaddress(message, callback) {
	console.log("inside handle req", message);
	let customerId = message.customerId;
	//let values = message.values;
	console.log("Id is:", customerId);

	Customers.findOne({ customerId: customerId},{address:1,_id:0}, function (err, user) {
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
	if (msg.path === "cusimage") {
		delete msg.path;
		cusImage(msg, callback);
	  } 
	if (msg.path === "customerFindKey") {
		delete msg.path;
		customerKey(msg, callback);
	  } 
	  if (msg.path === "addaddress") {
		delete msg.path;
		addaddress(msg, callback);
	  } 
	if (msg.path === "fetchaddress") {
		delete msg.path;
		fetchaddress(msg, callback);
	  } 
  }

exports.handle_request = handle_request;