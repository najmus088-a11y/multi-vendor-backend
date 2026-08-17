const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['buyer', 'vendor', 'seller', 'admin'], 
    default: 'buyer' 
  },
  
  // ভেন্ডরের জন্য অতিরিক্ত ফিল্ড (NID অপশনাল, শপ নম্বর এবং প্রোফাইল ইমেজ)
  shopNumber: { type: String },
  nidNumber: { type: String }, // Optional (NID বাধ্যতামূলক নয়, স্কিপ করা যাবে)
  profileImage: { type: String }, // Profile image upload option
  
  // OTP ও সিকিউরিটি ভেরিফিকেশন (ভেন্ডরের মূল সিকিউরিটি)
  isVerified: { type: Boolean, default: false },
  otpCode: { type: String },
  otpExpire: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);