const graphql = require('graphql');
//const _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');
const Customers = require('../models/customer')
const Restaurants = require("../models/restaurant");
const Orders = require("../models/order");
const Dishes = require("../models/dish");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = graphql;

const RestaurantType = new GraphQLObjectType({
    name: 'RestaurantType',
    fields: () => ({
        rname: {type: GraphQLString },
        restaurantId: {type: GraphQLInt},
        city: { type: GraphQLString },
        state: { type: GraphQLString},
        country: {type: GraphQLString},
        email: {type: GraphQLString },
        pwd: {type: GraphQLString },
        rdesc: {type: GraphQLString},
        fromTime: { type: GraphQLString },
        toTime: {type: GraphQLString},
        mobileNo: {type: GraphQLString},
        delivery: { type: GraphQLBoolean},
        pickup: {type: GraphQLBoolean},
        veg: { type: GraphQLBoolean },
        nonveg: {type: GraphQLBoolean},
        vegan: {type: GraphQLBoolean},
        profilepic: {type: GraphQLString }
    })
});

const CustomerType = new GraphQLObjectType({
    name : 'CustomerType',
    fields : ()=>({
    customerId : {type: GraphQLInt},
    cname : {type: GraphQLString},
    about : {type: GraphQLString},
    country : {type: GraphQLString},
    mobileNo :{type: GraphQLString},
    city : {type: GraphQLString},
    state : {type: GraphQLString},
    profilepic : {type: GraphQLString},
    email :{type: GraphQLString},
    pwd : {type:GraphQLString},
    DOB :{type:GraphQLString},
    nickname: {type:GraphQLString}, 
})
});

const DishType = new GraphQLObjectType({
    name : 'DishType',
    fields : ()=>({
        dishId : {type: GraphQLInt},
    dname : {type: GraphQLString},
    ddesc : {type: GraphQLString},
    veg : {type: GraphQLString},
    nonVeg :{type: GraphQLString},
    vegan : {type: GraphQLString},
    cuisine : {type: GraphQLString},
    category : {type: GraphQLString},
    restaurantId :{type: GraphQLString},
    price : {type:GraphQLString},
    profilepic :{type:GraphQLString},
    ingredients: {type:GraphQLString}, 
})
});

const OrderType = new GraphQLObjectType({
    name : 'OrderType',
    fields : ()=>({
        orderId : {type: GraphQLInt},
    customerId : {type: GraphQLInt},
    rname : {type: GraphQLString},
    total : {type: GraphQLInt},
    ostatus :{type: GraphQLString},
    mode : {type: GraphQLString},
    invoiceId : {type: GraphQLString},
    message : {type: GraphQLString},
    restaurantId :{type: GraphQLInt},
    address : {type:GraphQLString},
})
});

const OrderdetailType = new GraphQLObjectType({
    name : 'OrderdetailType',
    fields : ()=>({
        orderdetailsId : {type: GraphQLInt},
    price : {type: GraphQLInt},
    quantity : {type: GraphQLInt},
    dname : {type: GraphQLString},
    subtotal :{type: GraphQLInt},
    dishId : {type: GraphQLInt},
    invoiceId : {type: GraphQLString},
})
});

const CusloginResult = new GraphQLObjectType({
    name: 'CusloginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: CustomerType }
    })
});

const ResloginResult = new GraphQLObjectType({
    name: 'ResloginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: RestaurantType }
    })
});

const CussignupResult = new GraphQLObjectType({
    name: 'CussignupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const RessignupResult = new GraphQLObjectType({
    name: 'RessignupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    
    name: 'RootQueryType',
    fields: () => ({
        Cuslogin: {
            type: CusloginResult,
            args: {
                email: {
                    type: GraphQLString
                },
                pwd: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log('args: ', args);
                var isAuthenticated = false;
                var profileData = {};

                await Customers.findOne({
                    "email": args.email
                }, (err, user) => {
                    if (err) {
                        isAuthenticated = false;
                    }
                    else {
                        console.log('result', user.email);
                        if (!bcrypt.compareSync(args.pwd, user.pwd)) {
                            console.log('Invalid Credentials!');
                            //callback(null, null);                
                            isAuthenticated = false;
                        }
                        else {
                            console.log('Corect creds!')
                            isAuthenticated = true;

                            profileData = user

                        }
                    }
                });

                console.log('isauth', isAuthenticated);
                console.log('Profile Data', profileData);
                if (isAuthenticated === true) {
                    var result = {
                        result: true,
                        userData: profileData
                    }
                    console.log('UserData', result.userData);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
            }
        },
        Reslogin: {
            type: ResloginResult,
            args: {
                email: {
                    type: GraphQLString
                },
                pwd: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log('args: ', args);
                var isAuthenticated = false;
                var profileData = {};

                await Restaurants.findOne({
                    "email": args.email
                }, (err, user) => {
                    if (err) {
                        isAuthenticated = false;
                    }
                    else {
                        console.log('result', user.email);
                        if (!bcrypt.compareSync(args.pwd, user.pwd)) {
                            console.log('Invalid Credentials!');
                            //callback(null, null);                
                            isAuthenticated = false;
                        }
                        else {
                            console.log('Corect creds!')
                            isAuthenticated = true;
                            profileData = user

                        }
                    }
                });

                console.log('isauth', isAuthenticated);
                console.log('Profile Data', profileData);
                if (isAuthenticated === true) {
                    var result = {
                        result: true,
                        userData: profileData
                    }
                    console.log('UserData', result.userData);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
            }
        },
        CustomerDetails: {
            type: CustomerType,
            args: {
                customerId: {
                    type: GraphQLInt
                }
            },
            async resolve(parent, args) {
                console.log('args: ', args);
                let customerId= args.customerId;
                return Customers.findOne({ customerId: customerId}, function (err, user) {
                    console.log("user from DB reacibed", user);
            
                    if (err) {
                        return(null, 500);
                    } else if (user === null) {
                        return(null, 207);
                    } else {
                        return(null,user)
                    }
                });
            }
        },
        RestaurantDetails: {
            type: RestaurantType,
            args: {
                restaurantId: {
                    type: GraphQLInt
                }
            },
            async resolve(parent, args) {
                console.log('args: ', args);
                let restaurantId= args.restaurantId;
                return Restaurants.findOne({ restaurantId: restaurantId}, function (err, user) {
                    console.log("user from DB reacibed", user);
            
                    if (err) {
                        return(null, 500);
                    } else if (user === null) {
                        return(null, 207);
                    } else {
                        return(null,user)
                    }
                });
            }
        },

        getDish: {
            type: DishType,
            args: {
                DishId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Dishes.find({restaurantId:args.restaurantId},function(err, user ){
                    if (err) {
                        return ( 500);
                    } else {
                        return (user);
                    }
                })
            }
        },
        getOrder: {
            type: OrderType,
            args: {
                customerId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                let customerId = args.customerId;
	console.log("EmailId is:", customerId);

	return Orders.find({ customerId: customerId}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			return(null, 500);
		
		} else {
			return(null,user)
		}
	});
            }
        },
        getOrderdetails: {
            type: OrderdetailType,
            args: {
                customerId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                let customerId = args.customerId;
	console.log("EmailId is:", customerId);

	return Orders.findOne({ customerId: customerId, invoiceId: args.invoiceId},{orderdetails:1,_id:0}, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			return(null, 500);
		
		} else {
			return(null,user)
		}
	});
            }
        },
        getResOrder: {
            type: OrderType,
            args: {
                restaurantId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {

	return Orders.aggregate([
		{$lookup:{
			from: "customers",
			localField:"customerId",
			foreignField : "customerId",
			as:"table2" 
		}},
		{$unwind:"$table2"},

        { $match : {$expr :{ $eq: ["$restaurantId" , args.restaurantId]}  }},

	])
     .then((result)=>{

		console.log("--------------------------",result);
		return(null,result)
	 })
            }
        },
    })
})
   


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        registerUser: {
            type: CussignupResult,
            args: {
                cname: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                return Customers.findOne({
                    where: {
                        email: args.email
                    }
                }).then(user => {
                    return bcrypt.compare(args.password, user.pwd).then(result => {
                        if (!result) {
                            console.log("Password mismatch");
                            return false;
                        }
                        const {
                            cname,
                            email,
                            pwd,
                        } = user;
                        return {
                            cname,
                            email,
                            pwd,
                        }
                    });
                });
            }
        },
        registerRestaurant: {
            type: RessignupResult,
            args: {
                rname: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                return Restaurants.findOne({
                    where: {
                        email: args.email
                    }
                }).then(user => {
                    return bcrypt.compare(args.password, user.pwd).then(result => {
                        if (!result) {
                            console.log("Password mismatch");
                            return false;
                        }
                        const {
                            rname,
                            email,
                            pwd,
                        } = user;
                        return {
                            rname,
                            email,
                            pwd,
                        }
                    });
                });
            }
        },
        updateUser: {
            type: CustomerType,
            resolve(parent, args) {
                let customerId= args.customerId;
                let values = args.values;
                return Customers.findOneAndUpdate({ customerId: customerId}, values, function (err, user) {
                    console.log("user from DB reacibed", user);
            
                    if (err) {
                        return ( 500);
                    } else {
                        return (user);
                    }
                });
                
            }
        },
        updateRes: {
            type: RestaurantType,
            resolve(parent, args) {
                let restaurantId= args.restaurantId;
                let values = args.values;
                return Restaurants.findOneAndUpdate({ restaurantId: restaurantId}, values, function (err, user) {
                    console.log("user from DB reacibed", user);
            
                    if (err) {
                        return ( 500);
                    } else {
                        return (user);
                    }
                });
                
            }
        },
    
        addDish: {
            type: DishType,
            args: {
                name: {
                    type: GraphQLString
                },
                rate: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                image: {
                    type: GraphQLString
                },
                section: {
                    type: GraphQLString
                },
                restaurant_id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                var fav = new Dishes(args.dishes)
    console.log("favvvv",fav);
	return  fav.save( function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
            return ( 500);
        } else {
            return (user);
        }
	});
                
            }
        },
        
        addOrder: {
            type: OrderType,
            args: {
                rname: {
                    type: GraphQLString
                },
                orderDate: {
                    type: GraphQLString
                },
                total: {
                    type: GraphQLInt
                },
                restaurantId: {
                    type: GraphQLID
                },
                customerId: {
                    type: GraphQLID
                },
                invoiceId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                
    var order= new Orders(args);
	return  order.save(args, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
            console.log(err)
			return(null, 500);
		} else {
			return(null,user)
		}
	});
                
            }
        },

        addOrderDetails: {
            type: OrderdetailType,
            args: {a:[{
                rname: {
                    type: GraphQLString
                },
                orderDate: {
                    type: GraphQLString
                },
                total: {
                    type: GraphQLInt
                },
                restaurantId: {
                    type: GraphQLID
                },
                customerId: {
                    type: GraphQLID
                },
                invoiceId: {
                    type: GraphQLString
                }
            }]},
            resolve(parent, args) {
                
    
	return  Orders.updateOne({invoiceId:args.values[0].invoiceId}, {
        $addToSet:{
            orderdetails: args.values
        }
    }, (err, user)=>{
        console.log("user from DB", user);

        if (err) {
            console.log(err)
            return(null, 500);
        } else {
            return(null,user)
        }
    })
                
            }
        },
        
    }
});

console.log("inside")
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});