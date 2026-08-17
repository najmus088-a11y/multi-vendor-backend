const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// 1. Register (Buyer & Vendor)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, shopNumber, nidNumber } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

    let user = await User.findOne({ email });
    
    // যদি ইউজার আগে থেকেই থাকে এবং আনভেরিফাইড হয়, তবে তাকে আপডেট করে নতুন ওটিপি দিতে পারি বা আগেরটি রাখতে পারি। 
    // তবে সহজ রাখার জন্য ডুপ্লিকেট চেক রাখা হলো:
    if (user && user.isVerified) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role || 'buyer';
    
    let otpCode = null;
    let otpExpire = null;
    let isVerified = true; 

    // যদি ভেন্ডর বা সেলার হয়
    if (userRole === 'vendor' || userRole === 'seller') {
      otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // ৬ ডিজিটের ওটিপি
      otpExpire = Date.now() + 5 * 60 * 1000; // ৫ মিনিট মেয়াদ
      isVerified = false; 
    }

    if (user && !user.isVerified) {
      // যদি ইউজার অলরেডি ডাটাবেজে থাকে কিন্তু ভেরিফাইড না হয়, তবে তার তথ্য আপডেট করে নতুন ওটিপি দেবো
      user.name = name;
      user.password = hashedPassword;
      user.role = userRole;
      user.shopNumber = userRole === 'vendor' ? shopNumber : undefined;
      user.nidNumber = userRole === 'vendor' ? nidNumber : undefined;
      user.profileImage = profileImage || user.profileImage;
      user.otpCode = otpCode;
      user.otpExpire = otpExpire;
    } else {
      // নতুন ইউজার তৈরি
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
    }

    await user.save();

    // যদি ভেন্ডর হয়, তবে মেইলে ওটিপি পাঠানো হবে
    if (userRole === 'vendor' || userRole === 'seller') {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your Vendor Account Verification OTP',
          html: `<h3>Hello ${name},</h3><p>Your OTP code for vendor registration is: <b>${otpCode}</b></p><p>This code is valid for 5 minutes.</p>`
        });
        console.log(`OTP sent to ${email}: ${otpCode}`); // টার্মিনালে ওটিপি দেখার জন্য
      } catch (mailError) {
        console.log('Email send failed:', mailError);
      }
      
      return res.status(201).json({ 
        message: 'Registration successful! Please check your email for the OTP code.',
        requiresOtp: true,
        email: user.email
      });
    }

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

    // ডিবাগ করার জন্য টার্মিনালে প্রিন্ট হবে
    console.log("--- OTP Verification Check ---");
    console.log("DB OTP:", user.otpCode, " | Input OTP:", otpCode);
    console.log("DB Expire:", user.otpExpire, " | Current Time:", Date.now());

    if (!user.otpCode) {
      return res.status(400).json({ message: 'No OTP found for this user. Please register again.' });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: 'OTP code has expired. Please register again or request a new one.' });
    }

    if (String(user.otpCode).trim() !== String(otpCode).trim()) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    // ভেরিফিকেশন সফল হলে
    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    await user.save();

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