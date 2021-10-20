const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const addressSchema = new mongoose.Schema({
  addId:{
        type:ObjectId,
        ref:"address"
    },
  addline1: {
    type: String
  },
  addline2: {
    type: String
  },
  city: {
    type: String,
    
  },
  state:{
    type: String,
  },
  zipcode:{
    type: Number,
  },
  customerId:{
    type: Number,
  },

},{timestamps:true})

autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

addressSchema.plugin(autoIncrement.plugin, 'Subscriber');

// addressSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.addId = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('address', addressSchema)