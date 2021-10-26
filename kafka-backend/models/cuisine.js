const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const cuisineSchema = new mongoose.Schema({
  cuisineId:{
        type:ObjectId,
        ref:"cuisine"
    },
  cuisineName: {
    type: String
  },
 

},{timestamps:true})

module.exports = mongoose.model('cuisine', cuisineSchema)