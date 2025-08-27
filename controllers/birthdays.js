// controllers/birthdays.js
require('../dbConnect')

let Birthdays = require('../models/birthdays.js')

// ✅ Get all birthdays
let allBirthdays = async (req, res) => {
  try {
    let data = await Birthdays.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get single birthday by id
let singleBirthday = async (req, res) => {
  try {
    let _id = req.params._id
    let data = await Birthdays.find({ _id: _id })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete birthday
let deleteBirthday = async (req, res) => {
  try {
    let _id = req.params._id
    await Birthdays.deleteOne({ _id: _id })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Insert new birthday
let insertBirthday = async (req, res) => {
  try {
    let body = req.body
    await Birthdays.create(body) // ✅ using create
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Update birthday
let updateBirthday = async (req, res) => {
  try {
    let body = req.body
    let _id = req.params._id
    await Birthdays.updateOne({ _id: _id }, { $set: body })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  allBirthdays,
  singleBirthday,
  deleteBirthday,
  insertBirthday,
  updateBirthday,
}
