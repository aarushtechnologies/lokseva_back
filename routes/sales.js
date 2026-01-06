const express = require("express");
const {
  allSales,
  salesById,
  insertSale,
  updateSale,
  deleteSale,
} = require("../controllers/sales");

const router = express.Router();

// ===============================
// SALES LIST (FILTERS + PAGINATION)
// ===============================
router.get("/", allSales);

// ===============================
// USER SALES (LEGACY + SAFE)
// ===============================

// 🔴 LEGACY ROUTE (Flutter MySales depends on this)
router.get("/:_userId", salesById);

// 🟢 NEW SAFE ROUTE (for future use)
router.get("/user/:_userId", salesById);

// ===============================
// CRUD
// ===============================
router.post("/", insertSale);
router.patch("/:_id", updateSale);
router.delete("/:_id", deleteSale);

module.exports = router;
