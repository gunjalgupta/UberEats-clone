const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const favouriteSchema = new mongoose.Schema({
  favouriteId:{
        type:Number,
        ref:"favourite"
    },
  customerId: {
    type: Number
  },
  restaurantId: {
    type: Number
  },
},{timestamps:true})

autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 


favouriteSchema.plugin(autoIncrement.plugin, {
  model: 'favourite', // collection or table name in which you want to apply auto increment
  field: "favouriteId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


module.exports = mongoose.model('favourite', favouriteSchema)