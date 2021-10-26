const envv= require('dotenv').config({ path: '/Users/gunjalgupta/Desktop/UberEats-clone/backend/src/.env' })


const express = require('express')
const app = express()
const mongoose = require('mongoose')

const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const multer = require("multer");

const bcrypt = require("bcrypt");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


const PORT = process.env.PORT || 5000;

// parse requests of content-type = application/json
app.use(express.json());
app.use(cookieParser());
app.use(cors());
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

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

const customersRouter = require('./routes/customer')
app.use('/customer', customersRouter)

const restaurantRouter = require('./routes/restaurant')
app.use('/restaurant', restaurantRouter)


var server= app.listen(PORT, () => console.log(`Listening on port ${process.env.PORT}.`));



console.log(envv);
module.exports = app;

module.exports =server;