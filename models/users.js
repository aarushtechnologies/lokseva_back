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
const UsersSchema = new mongoose.Schema(
  {
    name: requiredString,
    taluka: requiredString,
    gaon: requiredString,
    gender: optionalString,
    mobile: requiredString,
    professions: [{ type: String }],
    details:optionalString
    
  },
  {
    collection: 'users',
    timestamps: true, // ✅ Mongoose will auto-add createdAt and updatedAt
  }
);



module.exports = new mongoose.model('users', UsersSchema)
