require('../dbConnect.js')
let mongoose = require('mongoose');

let inquiriesSchema = mongoose.Schema({
    rno:Number,
    sname:String,
    age:Number,
    city:String
})

module.exports = mongoose.model('inquiries',inquiriesSchema)


