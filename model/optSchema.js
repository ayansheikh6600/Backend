const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp_code: {
    type: String,
    required: true,
  },
  isUsed:{
    default:false,
    type:Boolean,
    required:true
  }
});

const OtpModel = mongoose.model("otp", schema);

module.exports = OtpModel;