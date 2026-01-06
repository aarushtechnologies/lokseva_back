require("../dbConnect");
const Sales = require("../models/sales");
const { deleteFromR2 } = require("../services/r2Service");

// ===============================
// GET SALES (PAGINATED + FILTERED)
// ===============================
const allSales = async (req, res) => {
  try {
    let { page = 1, limit = 20, talukas, category, search } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    if (talukas && talukas !== "सर्व") {
      filter.taluka = { $in: talukas.split(",").map((t) => t.trim()) };
    }

    if (category) filter.category = category;

    if (search && search.trim()) {
      filter.$text = { $search: search.trim() };
    }

    const [data, total] = await Promise.all([
      Sales.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v")
        .populate({ path: "_userId", select: "name mobile" }),
      Sales.countDocuments(filter),
    ]);

    res.json({ page, limit, total, hasMore: page * limit < total, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// GET SALES BY USER
// ===============================
const salesById = async (req, res) => {
  try {
    const data = await Sales.find({ _userId: req.params._userId })
      .sort({ createdAt: -1 })
      .populate({ path: "_userId", select: "name mobile" });

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
    await Sales.updateOne({ _id: req.params._id }, { $set: req.body });
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// DELETE SINGLE SALE (🔥 R2 CLEANUP)
// ===============================
const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params._id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // Delete photos from R2
    if (sale.photos?.length) {
      await Promise.all(sale.photos.map(deleteFromR2));
    }

    await Sales.deleteOne({ _id: sale._id });
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// BULK DELETE SALES (🔥 FUTURE-PROOF)
// ===============================
const bulkDeleteSales = async (req, res) => {
  try {
    const { saleIds } = req.body;

    if (!Array.isArray(saleIds) || !saleIds.length) {
      return res.status(400).json({ message: "No sale IDs provided" });
    }

    const sales = await Sales.find({ _id: { $in: saleIds } });

    const photos = sales.flatMap((s) => s.photos || []);
    await Promise.all(photos.map(deleteFromR2));

    await Sales.deleteMany({ _id: { $in: saleIds } });

    res.json({
      status: "success",
      deletedSales: sales.length,
      deletedPhotos: photos.length,
    });
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
  bulkDeleteSales,
};
