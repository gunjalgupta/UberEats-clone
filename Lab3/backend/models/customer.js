const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
var autoIncrement = require('mongoose-auto-increment');

const customerSchema = new mongoose.Schema({
  customerId:{
        type:Number,
        ref:"customer"
    },
  cname: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String,
    
  },
  about:{
    type: String,
  },
  DOB:{
    type: String,
  },
  email:{
    type: String,
    unique:true,
    required: true,
  },
  mobileNo:{
    type: Number,
  },
  nickname:{
    type: String,
  },
  profilepic:{
    type: String,
  },
  pwd:{
    type: String,
    required: true,
  },
  state:{
    type: String,
  },
  address: [{
    addId:{
          type:Number,
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
  }],
  

  },{timestamps:true})
  


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

customerSchema.plugin(autoIncrement.plugin, {
  model: 'Customer', // collection or table name in which you want to apply auto increment
  field: "customerId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

customerSchema.plugin(autoIncrement.plugin, {
  model: 'Customer', // collection or table name in which you want to apply auto increment
  field: "addressId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


module.exports = mongoose.model('Customer', customerSchema)