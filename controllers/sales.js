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

// ✅ Get all sales for a particular user by their _userId
let salesById = async (req, res) => {
  try {
    // Extract _userId from the route parameters
    let _userId = req.params._userId;

    // Use find() to retrieve all sales records for the given _userId
    let data = await Sales.find({ _userId: _userId }) // Find all sales matching the _userId
      .populate('_userId') // Optionally populate the related user data

    // Respond with the data (all sales records for that user)
    res.json(data);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: err.message });
  }
};


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
