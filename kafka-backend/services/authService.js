
const mongoose = require("mongoose");
//const Subscriber = mongoose.model("subscriber");

const Subscriber = require('../models/subscriber')

let handle_request = async (msg, callback) => {
	console.log("---------------Kafka backend :: Add comment----------------");
	console.log("Message is: ", msg);
	let err = {};
	let response = {};
	try {

    // getSubscriber = async (msg, callback) => {
     var res = {};
    Subscriber.find()
    //.then((response)=> console.log(response))
      .then((subscriber) => {
        res.status = 200;
        res.data = subscriber;
        console.log("res login = ", res);
        return callback(null, res);
        //res.json({ subscriber });
      })
      .catch((err) => {
        console.log(err);
        res.status = 500;
        res.data = "Internal Server Error!";

        console.log("res = ", res);
        callback(null, res);
      });
  //};
}
catch (error) {
  console.log(error);
  err.status = 500;
  err.data = "Error in Data";
  return callback(err, null);
}
}

exports.handle_request = handle_request;