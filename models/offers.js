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

// Offers Schema
const OfferSchema = new mongoose.Schema(
  {
    
    _userid: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Register collection
      ref: 'users',
      required: true,
    },
    score: {type:Number, required : true},
    payment : {type:Number, required : true},
    mode : {type:String, required : true},
    from: {type:Date ,required : true},
    to:{type:Date ,required : true},
    taluka: requiredString,
    photos: [
      {
        type: String, // Array of image URLs
        required: true,
      },
    ],
    
    datetime: {
      type: Date,
      default: Date.now, // auto set current date
    },
  },
  {
    collection: 'Offers',
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Offers', OfferSchema);
