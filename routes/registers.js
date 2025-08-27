let express = require('express');

let { 
  allRegisters,
  singleRegister, 
  deleteRegister,
  insertRegister,
  updateRegister
} = require('../controllers/registers.js');

let router = express.Router();

// Get all registers
router.get('/', allRegisters);

// Get single register by ID
router.get('/:_id', singleRegister);

// Insert a new register
router.post('/', insertRegister);

// Update a register by ID
router.patch('/:_id', updateRegister);

// Delete a register by ID
router.delete('/:_id', deleteRegister);

module.exports = router;
