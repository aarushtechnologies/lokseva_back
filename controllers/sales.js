require("../dbConnect");
const Sales = require("../models/sales");

// GET /api/sales?talukas[]=A&talukas[]=B&category=XYZ&search=abc&page=1&limit=10
const allSales = async (req, res) => {
  try {
    let { talukas, category, search, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Build filter object
    const filter = {};

    // Taluka filter
    if (talukas) {
      // If talukas is a string (single) → convert to array
      if (!Array.isArray(talukas)) talukas = [talukas];
      if (!talukas.includes("सर्व")) {
        filter.taluka = { $in: talukas };
      }
    }

    // Category filter
    if (category && category !== "सर्व") filter.category = category;

    // Search filter (title, details, category, taluka)
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { details: regex },
        { category: regex },
        { taluka: regex },
      ];
    }

    const total = await Sales.countDocuments(filter);

    const sales = await Sales.find(filter)
      .populate("_userId")
      .sort({ createdAt: -1 }) // latest first
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: sales,
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  } catch (err) {
    console.error(err);
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
