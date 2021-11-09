"use strict";
const Order= require("../models/order");

function getcusorder(message, callback) {
	console.log("inside handle req", message);
	let customerId = message.customerId;
	console.log("EmailId is:", customerId);

	Order.find({ customerId: customerId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		
		} else {
			callback(null,user)
		}
	});

}

//==================================================
function getcusorderdetail(message, callback) {
	console.log("inside handle req", message);
	let customerId = message.customerId;
	console.log("EmailId is:", customerId);

	Order.findOne({ customerId: customerId, invoiceId: message.invoiceId},{orderdetails:1,_id:0}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}

//==================================================
function getresOrder(message, callback) {
	console.log("inside handle req", message);
	let restaurantId = Number(message.restaurantId);
    let invoiceId= message.invoiceId;
	console.log("EmailId is:", restaurantId);
    console.log("invoiceId",invoiceId);

	// Order.findOne({ restaurantId: restaurantId}, function (err, user) {
	// 	console.log("user from DB reacibed", user);

	// 	if (err) {
	// 		callback(null, 500);
	// 	} else if (user === null) {
	// 		callback(null, 207);
	// 	} else {
	// 		callback(null,user)
	// 	}
	// });

    //let customerId= message.customerId;

	// Order.aggregate([
	// 	{
	// 	   $lookup:
	// 		  {
	// 			 from: "customers",
	// 			//  localField: "restaurantId",
	// 			//  foreignField: "restaurantId",
	// 			 pipeline:[
	// 				{ $match : {$expr :{ $and: [ {$eq:[ "invoiceId" , invoiceId]},
    //                 { $eq: ["restaurantId" , restaurantId]} ,
    //                 {$eq:["customerId", "$customerId"]}] }}},
	// 					// {$and:[
	// 					// 	{ "invoiceId" : invoiceId} ,
    //                     //     { "restaurantId" : restaurantId} ,
	// 					// 	{"customerId": "$customerId"}
	// 					// ]} ,},
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
	//  ])
    Order.aggregate([
		{$lookup:{
			from: "customers",
			localField:"customerId",
			foreignField : "customerId",
			as:"table2" 
		}},
		{$unwind:"$table2"},

        { $match : {$expr :{ $eq: ["$restaurantId" , restaurantId]}  }},
		//{$match: {$expr :{ $eq: [ "$table2.customerId", customerId] }}},
		//{$project: {table2:0}}

	])
     .then((result)=>{

		console.log("--------------------------",result);
		callback(null,result)
	 })
	//  .catch((err)=>{
	// 	callback(null, 500);
	//  })
}

//==================================================
function addorder(message, callback) {
	console.log("inside handle req", message);
	
    var order= new Order(message);
	order.save(message, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
            console.log(err)
			callback(null, 500);
		} else {
			callback(null,user)
		}
	});

}

//==================================================
function addorderDetails(message, callback) {
	console.log("inside handle req", message);
	

	//message.values.map((orderd)=>{
        Order.updateOne({invoiceId:message.values[0].invoiceId}, {
            $addToSet:{
                orderdetails: message.values
            }
        }, (err, user)=>{
            console.log("user from DB", user);
    
            if (err) {
                console.log(err)
                callback(null, 500);
            } else {
                callback(null,user)
            }
        })

    //})
   

}

//==================================================
function Ostatus(message, callback) {
	console.log("inside handle req", message.email);
	let orderId = Number(message.orderId);
	console.log("EmailId is:", orderId);

	Order.findOneAndUpdate({ orderId: orderId}, {ostatus:message.ostatus},function (err, user) {
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

//==================================================
function handle_request(msg, callback) {
	console.log("messageee",msg);
	if (msg.path === "getcusorder") {
	  delete msg.path;
	  getcusorder(msg, callback);
	} 
	if (msg.path === "getcusorderdetail") {
		delete msg.path;
		getcusorderdetail(msg, callback);
	  } 
    if (msg.path === "addorder") {
		delete msg.path;
		addorder(msg, callback);
	  } 
    if (msg.path === "addorderdetails") {
		//delete msg.path;
		addorderDetails(msg, callback);
	  }
    if (msg.path === "getresorder") {
		delete msg.path;
		getresOrder(msg, callback);
	  }  
    if (msg.path === "status") {
		delete msg.path;
		Ostatus(msg, callback);
	  } 
}


exports.handle_request = handle_request;