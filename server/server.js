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
const { User } = require('./models/Users');

//Middlewares
const { auth } = require('./middleware/Auth');
const { Brand } = require('./models/Brand');

//===========================================
//                  MODELS                  ==
//===========================================

app.post('/api/products/brand', auth,(req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) =>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success:true,
            brand:doc
        })
    })
})

//===========================================
//                  USERS                  ==
//===========================================
app.get('/api/users/auth',auth ,(req, res) => {
     res.status(200).json({
         isAdmin: req.user.role === 0 ? false : true,
         isAuth: true,
         email: req.user.email,
         name: req.user.name,
         lastname: req.user.lastname,
         role: req.user.role,
         cart: req.user.cart,
         history: req.user.history
     })
})


app.post('/api/users/register',(req,res) => {
  //The req.body defines the new user.
  const user = new User(req.body);

  //Saving the user in MongoDB.
  user.save((err,doc) => {
    //Response has success false and the error.
    if(err) return res.json({success:false,err});
    //Or success true and the document from MongoDB.
    res.status(200).json({
      success:true
    //  userData: doc
    })
  })
})


app.post('/api/users/login',(req,res)=>{
  //Find the email.
  User.findOne({'email':req.body.email}, (err,user)=>{
    if(!user) return res.json({loginSuccess:false, message:'Auth failed, email not found'})

    //CHecking password.
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({loginSuccess:false, message:'Wrong password'});

      //Generate a password.
      user.generateToken((err, token)=>{
        if(err) return res.status(400).send(err);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true
        })
      })
    })

  })
})

const port = process.env.PORT || 3002;
app.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})
