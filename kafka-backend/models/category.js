const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const categorySchema = new mongoose.Schema({
  catId:{
        type:ObjectId,
        ref:"category"
    },
  catname: {
    type: String
  },
 

},{timestamps:true})

module.exports = mongoose.model('category', categorySchema)