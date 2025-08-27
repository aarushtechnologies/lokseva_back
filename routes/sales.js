let express = require('express');

let { 
  allSales,
  singleSale, 
  deleteSale,
  insertSale,
  updateSale
} = require('../controllers/sales.js');

let router = express.Router();

// Get all sales
router.get('/', allSales);

// Get single sale by ID
router.get('/:_id', singleSale);

// Insert a new sale
router.post('/', insertSale);

// Update a sale by ID
router.patch('/:_id', updateSale);

// Delete a sale by ID
router.delete('/:_id', deleteSale);

module.exports = router;
