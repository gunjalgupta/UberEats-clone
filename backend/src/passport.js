var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const Customer = require("./models/customer");
const Restaurant = require("./models/restaurant");
const passport= require("passport");
const passportJWT = require('passport-jwt')

const opts = {
jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('JWT'),
secretOrKey : 'gunjal_secure_string'};

module.exports = (passport) =>{
    console.log("in the passport js")
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            console.log("jwt paylaad",jwt_payload);
            //Mongoose model to check whether the user exist or not
            console.log("=========", jwt_payload.role)
            if(jwt_payload.role == "resturant") {
                Restaurant.findOne({ email:jwt_payload.email})
                .then((customer) =>{
                console.log("here in then")
                console.log(customer)
                if(customer){
                    console.log("here in if")
                    return done(null, customer);
                }
                return done(null, false);
                })
                .catch((error)=>{
                console.log(error);
                })
            } else {
                console.log("here in else")
                Customer.findOne({email:jwt_payload.email})
                .then((customer) =>{
                console.log("here in then")
                console.log(customer)
                if(customer){
                    console.log("here in if")
                    return done(null, customer);
					 
                }
                return done(null, false);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        })
    )
}
// exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });



// // Setup work and export for the JWT passport strategy
// function auth() {
// 	console.log("-----In auth---");
// 	var opts = {
// 		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
// 		secretOrKey: secret,
// 	};
// 	passport.use(
// 		new JwtStrategy(opts, (jwt_payload, callback) => {
// 			console.log("jwt_payload", jwt_payload);
// 			const user_id = jwt_payload._id;
// 			console.log("user_id: ", user_id);
// 			Customers.findById(user_id, (err, results) => {
// 				if (err) {
// 					return callback(err, false);
// 				}
// 				if (results) {
// 					callback(null, results);
// 				} else {
// 					callback(null, false);
// 				}
// 			});
// 		})
// 	);
//     passport.use(
// 		new JwtStrategy(opts, (jwt_payload, callback) => {
// 			console.log("jwt_payload", jwt_payload);
// 			const user_id = jwt_payload._id;
// 			console.log("user_id: ", user_id);
// 			Restaurants.findById(user_id, (err, results) => {
// 				if (err) {
// 					return callback(err, false);
// 				}
// 				if (results) {
// 					callback(null, results);
// 				} else {
// 					callback(null, false);
// 				}
// 			});
// 		})
// 	);

//     passport.serializeUser(function (entity, done) {
//         done(null, { id: entity.id, type: entity.type });
//     });
    
//     passport.deserializeUser(function (obj, done) {
//         switch (obj.type) {
//             case 'customer':
//                 Customers.findById(obj.id)
//                     .then(user => {
//                         if (user) {
//                             done(null, user);
//                         }
//                         else {
//                             done(new Error('user id not found:' + obj.id, null));
//                         }
//                     });
//                 break;
//             case 'restaurant':
//                 Restaurants.findById(obj.id)
//                     .then(device => {
//                         if (device) {
//                             done(null, device);
//                         } else {
//                             done(new Error('device id not found:' + obj.id, null));
//                         }
//                     });
//                 break;
//             default:
//                 done(new Error('no entity type:', obj.type), null);
//                 break;
//         }
//     });
// }

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const mongoose = require('mongoose');
// const Resturant = require('../models/restaurant');
// const Customer = require('../models/customer');
