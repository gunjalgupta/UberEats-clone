const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscriber = mongoose.model("subscriber");

router.get("/getSubscriber", (req, res) => {
    req.body.path = "getSubscriber";
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