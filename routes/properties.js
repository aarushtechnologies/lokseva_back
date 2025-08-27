let express = require('express');

let { 
  allProperties,
  singleProperty, 
  deleteProperty,
  insertProperty,
  updateProperty
} = require('../controllers/properties.js');

let router = express.Router();

// Get all properties
router.get('/', allProperties);

// Get single property by ID
router.get('/:_id', singleProperty);

// Insert a new property
router.post('/', insertProperty);

// Update a property by ID
router.patch('/:_id', updateProperty);

// Delete a property by ID
router.delete('/:_id', deleteProperty);

module.exports = router;
