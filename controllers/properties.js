require('../dbConnect')

let Properties = require('../models/properties.js')

// ✅ Get all properties
let allProperties = async (req, res) => {
  try {
    let data = await Properties.find().populate('_userid') // populate user info if needed
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get single property by ID
let singleProperty = async (req, res) => {
  try {
    let _id = req.params._id
    let data = await Properties.findOne({ _id: _id }).populate('_userid')
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete property
let deleteProperty = async (req, res) => {
  try {
    let _id = req.params._id
    await Properties.deleteOne({ _id: _id })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Insert new property
let insertProperty = async (req, res) => {
  try {
    let body = req.body
    await Properties.create(body) // ✅ create is the right method
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Update existing property
let updateProperty = async (req, res) => {
  try {
    let body = req.body
    let _id = req.params._id
    await Properties.updateOne({ _id: _id }, { $set: body })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  allProperties,
  singleProperty,
  deleteProperty,
  insertProperty,
  updateProperty,
}
