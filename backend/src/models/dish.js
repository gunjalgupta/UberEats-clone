const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const dishSchema = new mongoose.Schema({
  dishId:{
        type:ObjectId,
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
  cuisineId:{
    type: Number,
  },
  categoryId:{
    type: Number,
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

dishSchema.plugin(autoIncrement.plugin, 'Dish');

dishSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.dishId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Dish', dishSchema)