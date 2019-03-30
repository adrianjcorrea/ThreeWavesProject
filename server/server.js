const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3002;


app.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})
