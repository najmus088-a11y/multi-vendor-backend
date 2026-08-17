const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { register, verifyOtp, login } = require('../controllers/authController');

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('profileImage'), register);
router.post('/verify-otp', verifyOtp); // নতুন ওটিপি ভেরিফিকেশন রুট
router.post('/login', login);

module.exports = router;