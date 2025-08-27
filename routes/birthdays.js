let express = require('express')

let { allBirthdays, singleBirthday, deleteBirthday, insertBirthday, updateBirthday } = require('../controllers/birthdays.js')

let router = express.Router()

// All Birthdays
router.get('/', allBirthdays)

// Birthday by Id
router.get('/:_id', singleBirthday)

// Delete by Id
router.delete('/:_id', deleteBirthday)

// Insert Data
router.post('/', insertBirthday)

// Update by Id
router.patch('/:_id', updateBirthday)

module.exports = router
