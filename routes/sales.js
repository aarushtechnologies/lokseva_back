const express = require("express");

const {
  allSales,
  salesById,
  deleteSale,
  insertSale,
  updateSale,
} = require("../controllers/sales");

const router = express.Router();

router.get("/", allSales);
router.get("/:_userId", salesById);
router.post("/", insertSale);
router.patch("/:_id", updateSale);
router.delete("/:_id", deleteSale);

module.exports = router;
