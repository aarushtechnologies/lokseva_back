let express = require('express');

let { 
  allUsers,
  singleUser, 
  deleteUser,
  insertUser,
  updateUser
} = require('../controllers/users.js');

let router = express.Router();

// Get all Users
router.get('/', allUsers);

// Get single User by ID
router.get('/:userId', singleUser);

// Insert a new User
router.post('/', insertUser);

// Update a User by ID
router.put('/:userId', updateUser);

// Delete a User by ID
router.delete('/:userId', deleteUser);

module.exports = router;
