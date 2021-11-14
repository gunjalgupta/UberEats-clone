const envv= require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')

const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const multer = require("multer");

const bcrypt = require("bcryptjs");

const passport= require("passport")

mongoose.connect("mongodb+srv://cluster0_Gunjal:databse@cluster0.1n5rc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


const PORT = process.env.PORT || 5000;

// parse requests of content-type = application/json
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//parse requests of content-type = application/x-www-form-urlencoded

// // setting view engine
// app.set("view engine", "ejs");

// // use body parser to parse JSON and urlencoded request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({ origin: `${process.env.appServer}`, credentials: true }));

// //Allow Access Control
// app.use(function (req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", `${process.env.appServer}`);
// 	res.setHeader("Access-Control-Allow-Credentials", "true");
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
// 	);
// 	res.setHeader("Cache-Control", "no-cache");
// 	next();
// });

// // use session to store user data between HTTP requests
// app.use(
// 	session({
// 		secret: "payal_splitwise_secure_string",
// 		resave: false,
// 		saveUninitialized: false,
// 		duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
// 		activeDuration: 5 * 60 * 1000,
// 	})
// );


app.use(express.static("./public"));

app.use(session({secret:"secret"}))
require("./passport")(passport)

app.use(passport.initialize());
app.use(passport.session());

const customersRouter = require('./routes/customer')
app.use('/customer', customersRouter)

const restaurantRouter = require('./routes/restaurant')
app.use('/restaurant', restaurantRouter)

const restaurantImage = require('./routes/imageRestaurant')
app.use('/imageRestaurant', restaurantImage)

const dishImage = require('./routes/imageDish')
app.use('/imageDish', dishImage)

const customerImage = require('./routes/uploadroutes')
app.use('/uploadroutes', customerImage)

const orderRouter = require('./routes/orders')
app.use('/orders', orderRouter)

var server= app.listen(PORT, () => console.log(`Listening on port 5000.`));


module.exports = app;

module.exports =server;