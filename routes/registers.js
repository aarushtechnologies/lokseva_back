let express = require('express')

let {allRegisters,singleRegister, deleteRegister,insertRegister,updateRegister} = require('../controllers/registers.js')
let router = express.Router()

// All Inquiries
router.get('/', allRegisters)

// Inquiry by Id
router.get('/:_id',singleRegister)

// delete by Id
router.delete('/:_id',deleteRegister)


// //Insert Data
router.post('/',insertRegister)


router.patch('/:_id',updateRegister)

module.exports = router;