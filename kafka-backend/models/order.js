const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

var autoIncrement = require('mongoose-auto-increment');

const orderSchema = new mongoose.Schema({
  orderId:{
        type:Number,
        ref:"order"
    },
  customerId: {
    type: Number
  },
  restaurantId: {
    type: Number
  },
  rname:{
    type:String
  },
  total: {
    type: Number,
    
  },
  ostatus:{
    type: String,
    default:"Order received",
  },
  mode:{
    type: String,
  },
  invoiceId:{
    type: String,
  },
  message:{
    type:String
  },
  address: {
      type: String
  },
  orderdetails:[{
  orderdetailsId:{
    type:Number,
    ref:"orderdetails"
},
price: {
type: Number
},
dname:{
  type:String
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
type: String,
},
  
}]
},{timestamps:true})

autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 


orderSchema.plugin(autoIncrement.plugin, {
  model: 'order', // collection or table name in which you want to apply auto increment
  field: "orderId", // field of model which you want to auto increment
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

module.exports = mongoose.model('order', orderSchema)