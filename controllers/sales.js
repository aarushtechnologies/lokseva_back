require("../dbConnect");
const Sales = require("../models/sales");

// Get paginated sales with filters
const allSales = async (req, res) => {
  try {
    const { page = 1, limit = 10, talukas, category, search } = req.query;

    let filter = {};

    // Taluka filter (array)
    if (talukas && talukas.length && !talukas.includes("सर्व")) {
      filter.taluka = { $in: Array.isArray(talukas) ? talukas : [talukas] };
    }

    // Category filter
    if (category && category !== "") {
      filter.category = category;
    }

    // Search filter
    if (search && search !== "") {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { title: regex },
        { details: regex },
        { category: regex },
        { taluka: regex },
      ];
    }

    const total = await Sales.countDocuments(filter);

    const data = await Sales.find(filter)
      .populate("_userId")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      total,      // ✅ total number of matching products
      data,
      hasMore: page * limit < total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const salesById = async (req, res) => {
  try {
    const data = await Sales.find({ _userId: req.params._userId }).populate(
      "_userId"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Insert, update, delete remain same
const insertSale = async (req, res) => {
  try {
    await Sales.create(req.body);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    await Sales.updateOne({ _id: req.params._id }, { $set: req.body });
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    await Sales.deleteOne({ _id: req.params._id });
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  allSales,
  salesById,
  insertSale,
  updateSale,
  deleteSale,
};
