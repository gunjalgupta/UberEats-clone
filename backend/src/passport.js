"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./passconfig");
const Customers = require("./models/customer");
const Restaurants = require("./models/restaurant");

// Setup work and export for the JWT passport strategy
function auth() {
	console.log("-----In auth---");
	var opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		secretOrKey: secret,
	};
	passport.use(
		new JwtStrategy(opts, (jwt_payload, callback) => {
			console.log("jwt_payload", jwt_payload);
			const user_id = jwt_payload._id;
			console.log("user_id: ", user_id);
			Customers.findById(user_id, (err, results) => {
				if (err) {
					return callback(err, false);
				}
				if (results) {
					callback(null, results);
				} else {
					callback(null, false);
				}
			});
		})
	);
    passport.use(
		new JwtStrategy(opts, (jwt_payload, callback) => {
			console.log("jwt_payload", jwt_payload);
			const user_id = jwt_payload._id;
			console.log("user_id: ", user_id);
			Restaurants.findById(user_id, (err, results) => {
				if (err) {
					return callback(err, false);
				}
				if (results) {
					callback(null, results);
				} else {
					callback(null, false);
				}
			});
		})
	);

    passport.serializeUser(function (entity, done) {
        done(null, { id: entity.id, type: entity.type });
    });
    
    passport.deserializeUser(function (obj, done) {
        switch (obj.type) {
            case 'customer':
                Customers.findById(obj.id)
                    .then(user => {
                        if (user) {
                            done(null, user);
                        }
                        else {
                            done(new Error('user id not found:' + obj.id, null));
                        }
                    });
                break;
            case 'restaurant':
                Restaurants.findById(obj.id)
                    .then(device => {
                        if (device) {
                            done(null, device);
                        } else {
                            done(new Error('device id not found:' + obj.id, null));
                        }
                    });
                break;
            default:
                done(new Error('no entity type:', obj.type), null);
                break;
        }
    });
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });