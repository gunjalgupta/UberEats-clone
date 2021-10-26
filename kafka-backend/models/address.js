const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const addressSchema = new mongoose.Schema({
  addId:{
        type:Number,
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


addressSchema.plugin(autoIncrement.plugin, {
  model: 'address', // collection or table name in which you want to apply auto increment
  field: "addressId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


// addressSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.addId = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('address', addressSchema)