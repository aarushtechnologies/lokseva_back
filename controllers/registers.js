require('../dbConnect')

let Registers = require('../models/registers.js')

// ✅ Get all registered users
let allRegisters = async (req, res) => {
  try {
    let data = await Registers.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get single user by ID
let singleRegister = async (req, res) => {
  try {
    let _id = req.params._id
    let data = await Registers.findOne({ _id: _id }) // using findOne instead of find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete user
let deleteRegister = async (req, res) => {
  try {
    let _id = req.params._id
    await Registers.deleteOne({ _id: _id })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Insert new user
let insertRegister = async (req, res) => {
  try {
    let body = req.body
    await Registers.create(body) // ✅ fixed insertOne → create
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Update existing user
let updateRegister = async (req, res) => {
  try {
    let body = req.body
    let _id = req.params._id
    await Registers.updateOne({ _id: _id }, { $set: body })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  allRegisters,
  singleRegister,
  deleteRegister,
  insertRegister,
  updateRegister,
}
