require('../dbConnect')

let Sales = require('../models/sales.js')

// ✅ Get all sales
let allSales = async (req, res) => {
  try {
    let data = await Sales.find().populate('_userId') // populate user info if needed
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get single sale by ID
let salesById = async (req, res) => {
  try {
    let _userId = req.params._userId
    let data = await Sales.find({ _userId: _userId }).populate('_userId')
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete sale
let deleteSale = async (req, res) => {
  try {
    let _id = req.params._id
    await Sales.deleteOne({ _id: _id })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Insert new sale
let insertSale = async (req, res) => {
  try {
    let body = req.body
    await Sales.create(body) // ✅ create is the right method
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Update existing sale
let updateSale = async (req, res) => {
  try {
    let body = req.body
    let _id = req.params._id
    await Sales.updateOne({ _id: _id }, { $set: body })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  allSales,
  salesById,
  deleteSale,
  insertSale,
  updateSale,
}
