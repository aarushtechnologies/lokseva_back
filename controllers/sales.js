require("../dbConnect");
const Sales = require("../models/sales");

// ===============================
// GET SALES (PAGINATED + FILTERED)
// ===============================
const allSales = async (req, res) => {
  try {
    let { page = 1, limit = 20, talukas, category, search } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    // ===============================
    // TALUKA FILTER
    // ===============================
    if (talukas && talukas !== "सर्व") {
      const talukaArray = talukas.split(",").map((t) => t.trim());
      filter.taluka = { $in: talukaArray };
    }

    // ===============================
    // CATEGORY FILTER
    // ===============================
    if (category && category !== "") {
      filter.category = category;
    }

    // ===============================
    // TEXT SEARCH (INDEXED)
    // ===============================
    if (search && search.trim() !== "") {
      filter.$text = { $search: search.trim() };
    }

    const [data, total] = await Promise.all([
      Sales.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v")
        .populate({
          path: "_userId",
          select: "name mobile",
        }),
      Sales.countDocuments(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      hasMore: page * limit < total,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// GET SALES BY USER
// ===============================
const salesById = async (req, res) => {
  try {
    const { _userId } = req.params;

    const data = await Sales.find({ _userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "_userId",
        select: "name mobile",
      });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// INSERT SALE
// ===============================
const insertSale = async (req, res) => {
  try {
    await Sales.create(req.body);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// UPDATE SALE
// ===============================
const updateSale = async (req, res) => {
  try {
    await Sales.updateOne(
      { _id: req.params._id },
      { $set: req.body }
    );
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// DELETE SALE
// ===============================
const deleteSale = async (req, res) => {
  try {
    await Sales.deleteOne({ _id: req.params._id });
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// 🔴 THIS WAS MISSING (MOST IMPORTANT)
// ===============================
module.exports = {
  allSales,
  salesById,
  insertSale,
  updateSale,
  deleteSale,
};
