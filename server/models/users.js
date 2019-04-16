const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT1 = 10;
require('dotenv').config();

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
  name:{
    type:String,
    required: true,
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
  token:{
    type:String
  }
});

userSchema.pre('save', function(next){
    var user = this;
 if(user.isModified('password')){
   bcrypt.genSalt(SALT1,function(err, salt){
       if(err) return next(err);

       bcrypt.hash(user.password, salt, function(err, hash){
           if(err) return next(err);
           user.password = hash;
           next();
       })
   })
 }else{
   next();
 }
})

userSchema.methods.comparePassword = function(userPassword, cb){
  bcrypt.compare(userPassword, this.password, function(err,isMatch){
      if(err) return cb(err);
      cb(null, isMatch)
  })
}

const User = mongoose.model('User',userSchema);

module.exports = { User }