const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Nodemailer Transporter Setup (আপনার জিমেইল বা অটোমেশন SMTP দিয়ে)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // আপনার .env ফাইলে থাকতে হবে
    pass: process.env.EMAIL_PASS  // আপনার .env ফাইলে থাকতে হবে
  }
});

// 1. Register (Buyer & Vendor)
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
    
    let otpCode = null;
    let otpExpire = null;
    let isVerified = true; // বায়ারের জন্য সরাসরি ভেরিফাইড

    // যদি ভেন্ডর বা সেলার হয়, তবে ওটিপি জেনারেট হবে এবং একাউন্ট আনভেরিফাইড থাকবে
    if (userRole === 'vendor' || userRole === 'seller') {
      otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // ৬ ডিজিটের ওটিপি
      otpExpire = Date.now() + 10 * 60 * 1000; // ১০ মিনিট মেয়াদ
      isVerified = false; 
    }

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      shopNumber: userRole === 'vendor' ? shopNumber : undefined,
      nidNumber: userRole === 'vendor' ? nidNumber : undefined,
      profileImage,
      otpCode,
      otpExpire,
      isVerified
    });

    await user.save();

    // যদি ভেন্ডর হয়, তবে স্বয়ংক্রিয়ভাবে মেইলে ওটিপি পাঠিয়ে দেওয়া হবে
    if (userRole === 'vendor' || userRole === 'seller') {
      try {
        await transporter.sendMail({
          from: '"Multi-Vendor E-Commerce" <no-reply@yourdomain.com>',
          to: email,
          subject: 'Your Vendor Account Verification OTP',
          html: `<h3>Hello ${name},</h3><p>Your OTP code for vendor registration is: <b>${otpCode}</b></p><p>This code is valid for 10 minutes.</p>`
        });
      } catch (mailError) {
        console.log('Email send failed:', mailError);
      }
      
      return res.status(201).json({ 
        message: 'Registration successful! Please check your email for the OTP code.',
        requiresOtp: true,
        email: user.email
      });
    }

    // বায়ারের জন্য সরাসরি সাকসেস মেসেজ
    res.status(201).json({ message: 'Buyer registered successfully! You can login now.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Verify OTP (For Vendors)
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Account is already verified.' });
    }

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: 'OTP code has expired. Please register again or request a new one.' });
    }

    // ভেরিফিকেশন সফল হলে
    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    await user.save();

    // টোকেন জেনারেট করে দেওয়া যাতে ভেরিফায়ার পর সরাসরি ড্যাশবোর্ডে চলে যেতে পারে
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_super_secret_key_here',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Account verified successfully!',
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

// 3. Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    // ভেন্ডর হলে একাউন্ট ওটিপি ভেরিফাইড কিনা চেক করা
    if ((user.role === 'vendor' || user.role === 'seller') && !user.isVerified) {
      return res.status(400).json({ 
        message: 'Please verify your account with the OTP sent to your email first.',
        requiresOtp: true,
        email: user.email
      });
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