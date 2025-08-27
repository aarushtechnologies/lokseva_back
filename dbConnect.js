// let mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/Codingwale')

// console.log('Db Connected')

let mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Db Connected'))
  .catch(err => console.log(err));
