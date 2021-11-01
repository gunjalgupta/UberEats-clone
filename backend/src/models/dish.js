const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const dishSchema = new mongoose.Schema({
  dishId:{
        type:Number,
        ref:"dish"
    },
  dname: {
    type: String
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
  restaurantId:{
    type: Number,
  },
  cuisine:{
    type: String,
    default:"Chinese"
  },
  categoryId:{
    type: String,
    default:"Apetizer"
  },
  ddesc:{
    type: String,
  },
  Price:{
    type: Number,
  },
  profilepic:{
    type: String,
  },
  ingredients:{
    type: String,
  },
 
},{timestamps:true})


dishSchema.plugin(autoIncrement.plugin, {
  model: 'dish', // collection or table name in which you want to apply auto increment
  field: "dishId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


// dishSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.dishId = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('Dish', dishSchema)