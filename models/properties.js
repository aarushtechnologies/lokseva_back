const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema(
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
    collection: 'Properties', // 👈 Different collection name
    timestamps: true          // auto adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Properties', propertiesSchema);
