const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type:{
    type:String,
    required:true
  },
  isVerify:{
    default:false,
    type:Boolean,
    required:true
  }
});

const UserModel = mongoose.model("user", schema);

module.exports = UserModel;