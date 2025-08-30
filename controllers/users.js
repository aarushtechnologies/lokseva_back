require('../dbConnect.js')
let Users = require('../models/users.js')

// ✅ Get all users
let allUsers = async (req, res) => {
  console.log('Fetching data');
  try {
    let data = await Users.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get single user by ID
let singleUser = async (req, res) => {
  try {
    let _id = req.params._id
    let data = await Users.findOne({ _id: _id })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete user
let deleteUser = async (req, res) => {
  try {
    let _id = req.params._id
    await Users.deleteOne({ _id: _id })
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

let insertUser = async (req, res) => {
  try {
    let body = req.body || {}; 
    console.log(body)
    // Convert professions to array if it comes as string
    if (body.professions && typeof body.professions === "string") {
      body.professions = body.professions.split(",").map(p => p.trim());
    }

    const user = await Users.create(body);
    res.json({ success: true, data: user,_userId : user._id });
    console.log(user,user._id);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ Update existing user
let updateUser = async (req, res) => {
  try {
    let body = req.body || {}
    let _id = req.params.userId
    console.log(_id)
    // Convert professions string → array (if needed)
    if (body.professions && typeof body.professions === "string") {
      body.professions = body.professions
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    }

    const updatedUser = await Users.findByIdAndUpdate(_id, body, { new: true })
    // res.json(updatedUser) // return updated object with _id
    res.json({ success: true, data: updatedUser,_userId : updatedUser._id });
    console.log(updateUser);

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  allUsers,
  singleUser,
  deleteUser,
  insertUser,
  updateUser,
}
