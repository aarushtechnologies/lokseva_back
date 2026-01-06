const express = require("express");
const {
  allSales,
  salesById,
  deleteSale,
  insertSale,
  updateSale,
} = require("../controllers/sales");

const router = express.Router();

// ===============================
// SALES LIST (FILTERS + PAGINATION)
// ===============================
router.get("/", allSales);

// ===============================
// USER SALES (SAFE ROUTE)
// ===============================
router.get("/user/:_userId", salesById);

// ===============================
// CRUD
// ===============================
router.post("/", insertSale);
router.patch("/:_id", updateSale);
router.delete("/:_id", deleteSale);

module.exports = router;
