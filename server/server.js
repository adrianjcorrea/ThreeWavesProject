const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Models
const { User } = require('./models/Users');
const { Brand } = require('./models/Brand');
const { Wood } = require('./models/Woods');
const { Product } = require('./models/Products');

//Middlewares
const { auth } = require('./middleware/Auth');
const { admin } = require('./middleware/Admin');

//=================================
//==          PRODUCTS           ==
//=================================

// BY ARRIVAL
//EXAMPLE:articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// EXAMPLE:articles?sortBy=sold&order=desc&limit=100&skip=5
app.get('/api/product/articles', (req, res) => {
  //Creating to get item on described in search bar.
  let order = req.query.order ? req.query.order : 'asc';
  //Sort by given item else by id.
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  //Get defined number of content else get 100
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;  
  
  //Defining response from get request.
  Product.
  find().
  populate('brand').
  populate('wood').
  sort([[sortBy,order]]).
  limit(limit).
  exec((err,articles) => {
    if(err) return res.status(400).send(err);
    res.send(articles)
  });
});


//api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id; 

  if(type === "array") {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item)
    });
  } 

  Product.
  find({ '_id':{ $in:items }}).
  populate('brand').
  populate('wood').
  exec((err,docs) => {
    return res.status(200).send(docs);
  });
});


app.post('/api/product/article', auth, admin, (req, res)=>{
  const product = new Product(req.body);  
  
  product.save((err, doc) => {
    if(err) return res.json({ success:false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
});

//=================================
//==           WOODS             ==
//=================================

app.post('/api/product/wood', auth, admin, (req, res) => {
  const wood = new Wood(req.body);  
  
  wood.save((err,doc)=>{
    if(err) return res.json({ success:false,err });
    res.status(200).json({
      success: true,
      wood: doc
    });
  });
});

app.get('/api/product/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if(err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});

//===========================================
//==               BRANDS                  ==
//===========================================

app.post('/api/products/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);  
  
  brand.save((err, doc) => {
    if(err) return res.json({ success: false, err });
    res.status(200).json({
        success:true,
        brand:doc
    });
  });
});

app.get('/api/products/getBrands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if(err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});
//===========================================
//==               USERS                   ==
//===========================================
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});


app.post('/api/users/register', (req, res) => {
  //The req.body defines the new user.
  const user = new User(req.body);

  //Saving the user in MongoDB.
  user.save((err,doc) => {
    //Response has success false and the error.
    if(err) return res.json({ success:false,err });
    //Or success true and the document from MongoDB.
    res.status(200).json({
      success:true
    //  userData: doc
    });
  });
});


app.post('/api/users/login', (req, res) => {
  //Find the email.
  User.findOne({ 'email':req.body.email }, (err, user) => {
    if(!user) return res.json({ loginSuccess:false, message:'Auth failed, email not found' });

    //CHecking password.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ loginSuccess:false, message:'Wrong password' });

      //Generate a password.
      user.generateToken((err, token) => {
        if(err) return res.status(400).send(err);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true
        });
      });
    });
  });
});

const port = process.env.PORT || 3002;
app.listen(port,()=>{
  console.log(`Server running on port ${port}`)
});
