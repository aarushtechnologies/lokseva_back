require("../dbConnect");
const Sales = require("../models/sales");

// Get all sales
const allSales = async (req, res) => {
  try {
    const data = await Sales.find().populate("_userId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sales by user
const salesById = async (req, res) => {
  try {
    const data = await Sales.find({
      _userId: req.params._userId,
    }).populate("_userId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Insert sale
const insertSale = async (req, res) => {
  try {
    await Sales.create(req.body);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update sale
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

// Delete sale
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
