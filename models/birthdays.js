const mongoose = require('mongoose');

// Reusable required string type
const requiredString = { type: String, required: true };

const birthdaySchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    payment: { type: Number, required: true },
    mode: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
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
    collection: 'Birthdays',
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Birthday', birthdaySchema);
