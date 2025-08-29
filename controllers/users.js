require('../dbConnect.js')

let Users = require('../models/users.js')


const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Specify the folder where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Unique filename
  }
});

// Create multer upload instance
const upload = multer({ storage: storage });


// ✅ Get all Usered users
let allUsers = async (req, res) => {
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
    let data = await Users.findOne({ _id: _id }) // using findOne instead of find()
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
    // Multer middleware for single image (photo) and multiple images (images)
    upload.fields([
      { name: 'photo', maxCount: 1 },    // Single file for 'photo'
      { name: 'images', maxCount: 10 }    // Multiple files for 'images' (maximum 10)
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      let body = req.body;

      // Handling the 'photo' field (single image)
      if (req.files['photo']) {
        body.photo = req.files['photo'][0].path; // Save the path of the uploaded photo
      }

      // Handling the 'images' field (multiple images)
      if (req.files['images']) {
        body.images = req.files['images'].map(file => file.path); // Store file paths for multiple images
      }

      // If professions are sent as a CSV, convert it to an array
      if (body.professions) {
        body.professions = body.professions.split(',');  // Convert CSV to array
      }

      // Now save the user data with the images
      await Users.create(body);

      res.json({ status: 'success' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/*
// ✅ Insert new user
let insertUser = async (req, res) => {
  try {
    let body = req.body
    await Users.create(body) // ✅ fixed insertOne → create
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
  */

// ✅ Update existing user
let updateUser = async (req, res) => {
  try {
    let body = req.body
    let _id = req.params._id
    await Users.updateOne({ _id: _id }, { $set: body })
    res.json({ status: 'success' })
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
