const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserPreference, updateUserPreference } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/preference', protect, getUserPreference);
router.put('/preference', protect, updateUserPreference);

// router.get('/', (req, res) => {
//   res.json({ message: 'List of users' });
// });

module.exports = router;
