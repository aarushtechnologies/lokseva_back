require('../dbConnect')
let mongoose = require('mongoose')

const requiredString = {
  type: String,
  required: true,
};

const optionalString = {
  type: String,
  required: false,
};

const RegisterSchema = new mongoose.Schema(
  {
    name: requiredString,          // Name
    taluka: requiredString,        // Taluka
    gaon: requiredString,          // Gaon
    gender: optionalString,        // Gender
    mobile: requiredString,        // Mobile
    photo: optionalString,         // URL to profile photo
  },
    // { timestamps: true },
    { collection: 'Register' } // <-- ✅ match the actual collection name

);


module.exports = new mongoose.model('Register', RegisterSchema)
