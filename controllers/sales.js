require("../dbConnect");
const Sales = require("../models/sales");

// GET /api/sales
const allSales = async (req, res) => {
  try {
    let { talukas, category, search, page = 1, limit = 10, userId } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    /* =========================
       1️⃣ BASE FILTER (NO TALUKA)
       ========================= */
    const baseFilter = {};

    if (userId) {
      baseFilter._userId = userId;
    }

    // ✅ TOTAL OF ALL PRODUCTS (NO TALUKA / CATEGORY / SEARCH)
    const totalAll = await Sales.countDocuments(baseFilter);

    /* =========================
       2️⃣ FILTERED QUERY
       ========================= */
    const filter = { ...baseFilter };

    // Taluka filter
    if (talukas) {
      if (!Array.isArray(talukas)) talukas = [talukas];
      if (!talukas.includes("सर्व")) {
        filter.taluka = { $in: talukas };
      }
    }

    // Category filter
    if (category && category !== "सर्व") {
      filter.category = category;
    }

    // Search filter
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { details: regex },
        { category: regex },
        { taluka: regex },
      ];
    }

    // ✅ TOTAL AFTER FILTERS
    const totalFiltered = await Sales.countDocuments(filter);

    // Paginated data
    const sales = await Sales.find(filter)
      .populate("_userId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: sales,
      totalAll,          // ✅ ALL PRODUCTS
      total: totalFiltered, // ✅ FILTERED PRODUCTS
      page,
      limit,
      hasMore: page * limit < totalFiltered,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
