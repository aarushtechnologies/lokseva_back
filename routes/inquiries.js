let express = require('express')
let  {allInquires, singleInquiry, deleteInquiry,insertInquiry,updateInquiry} = require('../controllers/inquiries.js')
let router = express.Router()

// All Inquiries
router.get('/', allInquires)

// Inquiry by Id
router.get('/:rno',singleInquiry)

// delete by Id
router.delete('/:rno',deleteInquiry)


//Insert Data
router.post('/',insertInquiry)


router.patch('/:rno',updateInquiry)

module.exports = router;