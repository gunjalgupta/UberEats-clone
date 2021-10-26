const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const restaurantSchema = new mongoose.Schema({
  restaurantId:{
        type:ObjectId,
        ref:"Restaurant"
    },
  rname: {
    type: String,
    trim: true,
  },
  city: {
    type: String
  },
  countryId: {
    type: String,
    
  },
  rdesc:{
    type: String,
  },
  toTime:{
    type: Date,
  },
  fromTime:{
    type: Date,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobileNo:{
    type: Number,
  },
  delivery:{
    type: String,
  },
  pickup:{
    type: String,
  },
  veg:{
    type: String,
  },
  nonVeg:{
    type: String,
  },
  vegan:{
    type: String,
  },
  profilepic:{
    type: String,
  },
  pwd:{
    type: String,
    required: true,
  },
  stateId:{
    type: String,
    required: true,
  },
},{timestamps:true})


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

restaurantSchema.plugin(autoIncrement.plugin, {
  model: 'Restaurant', // collection or table name in which you want to apply auto increment
  field: "restaurantId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});




// restaurantSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.restaurantId = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('Restaurant', restaurantSchema)