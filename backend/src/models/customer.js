const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
var autoIncrement = require('mongoose-auto-increment');

const customerSchema = new mongoose.Schema({
  customerId:{
        type:ObjectId,
        ref:"customer"
    },
  cname: {
    type: String
  },
  city: {
    type: String
  },
  countryId: {
    type: String,
    
  },
  about:{
    type: String,
  },
  DOB:{
    type: Date,
  },
  email:{
    type: String,
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
  stateId:{
    type: String,
  },
},{timestamps:true})

autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

customerSchema.plugin(autoIncrement.plugin, 'Subscriber');

customerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.customerId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Customer', customerSchema)