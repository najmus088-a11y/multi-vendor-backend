const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register (Buyer & Vendor - No OTP)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, shopNumber, nidNumber } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role || 'buyer';
    
    // ওটিপি বাদ দেওয়া হয়েছে, তাই সবার অ্যাকাউন্টই সরাসরি ভেরিফাইড হবে
    let isVerified = true; 

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      shopNumber: userRole === 'vendor' ? shopNumber : undefined,
      nidNumber: userRole === 'vendor' ? nidNumber : undefined,
      profileImage,
      isVerified
    });

    await user.save();

    res.status(201).json({ 
      message: 'Registration successful! You can login now.',
      requiresOtp: false 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_super_secret_key_here',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        shopNumber: user.shopNumber,
        profileImage: user.profileImage
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};