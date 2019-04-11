const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email:{
    type:String,
    require: true,
    trim: true,
    unique: 1

  },
  password:{
    type:String,
    required:true,
    maxlength:100
  },
  lastname:{
    type:String,
    required: true,
    maxlength:100
  },
  cart:{
    type:Array,
    default: []
  },
  history:{
      type:Array,
      default: []
  },
  role:{
    type:Number,
    default:0
  },
  token:String
 }
})

const User = mongoose.model('User',userSchema);

module.exports = { User }
