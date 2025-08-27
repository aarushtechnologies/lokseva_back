const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
  {
    _userid: {
      type: mongoose.Schema.Types.ObjectId, // Ref to user collection
      ref: 'Register',
      required: true
    },
    taluka: {
      type: String,
      required: true,
      trim: true
    },
    photos: {
      type: [String], // Array of image URLs/paths
      default: []
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    details: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  
  { 
    collection: 'Sales',
    timestamps: true 
    } // adds createdAt & updatedAt
);

module.exports = mongoose.model('Sales', salesSchema);
