const express = require("express");
const {
  allSales,
  salesById,
  insertSale,
  updateSale,
  deleteSale,
  bulkDeleteSales,
} = require("../controllers/sales");

const router = express.Router();

// LIST
router.get("/", allSales);

// USER SALES (legacy + safe)
router.get("/:_userId", salesById);
router.get("/user/:_userId", salesById);

// CRUD
router.post("/", insertSale);
router.patch("/:_id", updateSale);
router.delete("/:_id", deleteSale);

// 🔥 BULK DELETE
router.post("/bulk-delete", bulkDeleteSales);

module.exports = router;
