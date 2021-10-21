var connection = new require("./kafka/Connection");
const envv= require('dotenv').config({ path: '/Users/gunjalgupta/Desktop/UberEats-clone/backend/src/.env' })


const mongoose = require("mongoose");
//const keys = require("./config/keys");
//const { MONGOURI } = require("./config/keys");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,

  
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./models/subscriber");
console.log(envv);

var authService = require("./services/authService.js");
var postService = require("./services/Post/postService");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log("poducer send  = ", data);
      });
      return;
    });
  });
}

function response(data, res, producer) {
	console.log("after handle", res);
	var payloads = [
		{
			topic: data.replyTo,
			messages: JSON.stringify({
				correlationId: data.correlationId,
				data: res,
			}),
			partition: 0,
		},
	];
	producer.send(payloads, function (err, data) {
		//console.log('producer send', data);
		if (err) {
			console.log("Error when producer sending data", err);
		} else {
			console.log(data);
		}
	});
	return;
}


handleTopicRequest("getTopic", authService);
handleTopicRequest("postTopic", postService);