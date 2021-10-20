const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const orderdetailsSchema = new mongoose.Schema({
  orderdetailsId:{
        type:ObjectId,
        ref:"orderdetails"
    },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  subtotal: {
    type: Number,
  },
  dishId:{
    type: Number,
  },
  invoiceId:{
    type: Number,
  },

},{timestamps:true})

autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

orderdetailsSchema.plugin(autoIncrement.plugin, 'orderdetails');

// addressSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.addId = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('orderdetails', orderdetailsSchema)