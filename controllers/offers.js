require('../dbConnect')

let Offers = require('../models/offers.js')

// ✅ Get all offers
let allOffers = async (req, res) => {
  try {
    let data = await Offers.find().populate('_userid') // also fetch Register user details
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get single offer by id
let singleOffer = async (req, res) => {
  try {
    let _id = req.params._id
    let data = await Offers.find({ _id: _id }).populate('_userid')
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete offer
let deleteOffer = async (req, res) => {
  try {
    let _id = req.params._id
    await Offers.deleteOne({ _id: _id })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Insert new offer
let insertOffer = async (req, res) => {
  try {
    let body = req.body
    await Offers.create(body) // ✅ using create instead of insertOne
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Update offer
let updateOffer = async (req, res) => {
  try {
    let body = req.body
    let _id = req.params._id
    await Offers.updateOne({ _id: _id }, { $set: body })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  allOffers,
  singleOffer,
  deleteOffer,
  insertOffer,
  updateOffer,
}
