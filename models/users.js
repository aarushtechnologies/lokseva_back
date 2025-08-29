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
    photo: optionalString,
    professions: [{ type: String }],
    details:optionalString,
    images :[{type:String}]
  },
  {
    collection: 'users',
    timestamps: true, // ✅ Mongoose will auto-add createdAt and updatedAt
  }
);



module.exports = new mongoose.model('users', UsersSchema)
