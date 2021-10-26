const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const kafka = require("../kafka/client");
//const Subscriber = mongoose.model("subscribers");

const Subscriber = require('../models/subscriber')

router.get("/getSubscriber", (req, res) => {
    req.body.path = "getSubscriber";
    console.log("here",req.body)
    kafka.make_request("getTopic", req.body, (err, results) => {
      console.log("results = ", results);
      if (results.status === 200) {
        const subscribers = results.data;
        res.json({ subscribers });
      } else res.status(422).json(res.err);
    });
    // Location.find()
    //   .then((locations) => {
    //     res.json({ locations });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });


module.exports = router;