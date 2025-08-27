let express = require('express')

let { allOffers, singleOffer, deleteOffer, insertOffer, updateOffer } = require('../controllers/offers.js')
let router = express.Router()

// All Offers
router.get('/', allOffers)

// Offer by Id
router.get('/:_id', singleOffer)

// Delete by Id
router.delete('/:_id', deleteOffer)

// Insert Data
router.post('/', insertOffer)

// Update by Id
router.patch('/:_id', updateOffer)

module.exports = router
