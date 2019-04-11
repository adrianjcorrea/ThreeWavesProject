const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,  {useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Models
const { User } = require('./models/users');
//===========================================
//                  USERS                  ==
//===========================================

app.post('/api/users/register',(req,res)=>{
  //The req.body defines the new user.
  const user = new User(req.body);

  //Saving the user in MongoDB.
  user.save((err,doc) => {
    //Response has success false and the error.
    if(err) return res.json({success:false,err});
    //Or success true and the document from MongoDB.
    res.status(200).json({
      success:true,
      userData: doc
    })
  })
})

const port = process.env.PORT || 3002;
app.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})
