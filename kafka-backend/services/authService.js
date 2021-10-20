
const mongoose = require("mongoose");
//const Subscriber = mongoose.model("subscriber");

const Subscriber = require('../models/subscriber')

getSubscriber = async (msg, callback) => {
    var res = {};
    Subscriber.find()
      .then((subscriber) => {
        res.status = 200;
        res.data = subscriber;
        console.log("res login = ", res);
        return callback(null, res);
        // res.json({ locations });
      })
      .catch((err) => {
        console.log(err);
        res.status = 500;
        res.data = "Internal Server Error!";
        callback(null, res);
      });
  };