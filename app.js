// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('useFindAndModify', false);

const app = express();
const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static('images'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

//Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'+`${process.env.MONGO_URI}`))
  .catch(e => console.error(e));

// ROUTERS
app.use('/Users', require('./routes/Users'));
app.use('/Gallery', require('./routes/Images'));
//app.use('/Images', require('./routes/Images'))

app.listen(port, () => console.log(`Server listening on port ${port}`));
