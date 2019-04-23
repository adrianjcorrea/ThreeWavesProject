const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  name:{
    required: true,
    type: String,
    unique: 1,
    maxlength:100
  }
  description:{
    required: true,
    type: String,
    maxlength:100000
  },
  price:{
    required: true,
    type: String,
    maxlength:255
  },
  brand:{
    type: Schema.Types.ObjectId,
    ref:'Brand',
    required: true
  }.
  shipping:{
    required:true,
    type: Boolean,

  },
  available:{
    required: true,
    type: Boolean
  },
  wood:{
    type: Schema.Types.ObjectId,
    ref:'Wood',
    required: true
  },
  frets:{
    required: true,
    type: Number
  },
  sold:{
    required: true,
    maxlength: 100
  },
  publish:{
    required: true,
    type: Boolean
  },
  images:{
    type: Array,
    default: []
  }


},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports = { Product }
