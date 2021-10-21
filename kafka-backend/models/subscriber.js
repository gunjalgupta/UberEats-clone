const mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
const {ObjectId} = mongoose.Schema.Types

const subscriberSchema = new mongoose.Schema({
  subId:{
    type:Number,
    
},
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
},{timestamps:true})

autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

subscriberSchema.plugin(autoIncrement.plugin, {
  model: 'Subscribers', // collection or table name in which you want to apply auto increment
  field: "subId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

// subscriberSchema.plugin(autoIncrement.plugin, {
//   model: 'Subscribers', // collection or table name in which you want to apply auto increment
//   field: "_id", // field of model which you want to auto increment
//   startAt: 1, // start your auto increment value from 1
//   incrementBy: 1, // incremented by 1
// });



// subscriberSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.subId = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });



module.exports = mongoose.model('Subscriber', subscriberSchema)