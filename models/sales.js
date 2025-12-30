const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    taluka: String,
    photos: {
      type: [String], // R2 URLs
      default: [],
    },
    category: String,
    title: String,
    details: String,
    price: Number,
  },
  {
    collection: "Sales",
    timestamps: true,
  }
);

module.exports = mongoose.model("Sales", salesSchema);
