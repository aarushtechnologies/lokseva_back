const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true, // ✅ fast user sales
    },

    taluka: {
      type: String,
      index: true, // ✅ fast taluka filter
    },

    category: {
      type: String,
      index: true, // ✅ fast category filter
    },

    title: {
      type: String,
      trim: true,
    },

    details: {
      type: String,
      trim: true,
    },

    photos: {
      type: [String], // Cloudflare R2 URLs
      default: [],
    },

    price: {
      type: Number,
      index: true, // optional (sorting / range queries)
    },
  },
  {
    collection: "Sales",
    timestamps: true,
  }
);

// ===============================
// 🔍 TEXT SEARCH INDEX
// ===============================
salesSchema.index({
  title: "text",
  details: "text",
  taluka: "text",
  category: "text",
});

// ===============================
// 📅 SORTING INDEX (Latest first)
// ===============================
salesSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Sales", salesSchema);
