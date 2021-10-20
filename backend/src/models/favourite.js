const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const favouriteSchema = new mongoose.Schema({
  favouriteId:{
        type:ObjectId,
        ref:"favourite"
    },
  customerId: {
    type: Number
  },
  restaurantId: {
    type: Number
  },
},{timestamps:true})

module.exports = mongoose.model('favourite', favouriteSchema)