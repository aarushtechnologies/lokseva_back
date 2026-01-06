require("../dbConnect");
const Sales = require("../models/sales");

// ===============================
// GET SALES (PAGINATED + FILTERED)
// ===============================
const allSales = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 20,
      talukas,
      category,
      search,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    // ===============================
    // TALUKA FILTER
    // ===============================
    if (talukas && talukas !== "सर्व") {
      const talukaArray = talukas.split(",").map(t => t.trim());
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

    // ===============================
    // QUERY
    // ===============================
    const query = Sales.find(filter)
      .sort({ createdAt: -1 }) // ✅ consistent pagination
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v") // lighter payload
      .populate({
        path: "_userId",
        select: "name mobile", // ⚠️ limit fields
      });

    const [data, total] = await Promise.all([
      query,
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
