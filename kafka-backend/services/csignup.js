"use strict";
const bcrypt = require("bcryptjs");
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
	console.log("inside handle req", message);
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

	Restaurants.aggregate([
		{$lookup:{
			from: "dishes",
			localField:"restaurantId",
			foreignField : "restaurantId",
			as:"table2" 
		}},
		{$unwind:"$table2"},
		
		{$match:  {$or: [ {"table2.dname": name} , {"table2.cuisine": name}]}},
		//{$match: {$expr :{ $eq: [ "$table2.dname", name] }}},
		{$project: {table2:0}}

	],(err,res)=>{
		console.log("res1",res)
		res.map((res1)=>{
			finaldata.push(res1)
		})
		console.log("----",finaldata);
	}).then((result)=>{
		Restaurants.find( {$or: [ {rname: name} , {city: name}, {stateId : name },{countryId  : name}]},  (err, res) => {
					if(err){
						console.log(err);
						callback(null,500);
					}
					else{
						console.log("rest",res)
						res.map((res1)=>{
							finaldata.push(res1)
						})
						console.log("here")
						callback(null,finaldata)
					}
				})
		
		  })
	
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
		
		{$match: {$expr :{ $eq: [ "$table2.customerId", customerId] }}},

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
	console.log("Id is:", customerId);

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
		if(msg.name===''){
			console.log("get")
			getRestaurants(msg, callback);	
		}
		else{
			console.log("search")
			searchRestaurant(msg, callback);
		}
		
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