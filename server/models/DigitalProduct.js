const mongoose = require('mongoose');

const digitalProductSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  commissionRate: { type: Number, default: 10 }, // ১০% কমিশন
  fileUrl: { type: String, required: true }, // ডাউনলোডেবল ফাইলের লিংক
  image: { type: String },
  isFeatured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  } // অ্যাডমিন অ্যাপ্রুভালের জন্য স্ট্যাটাস ফিল্ড
}, { timestamps: true });

module.exports = mongoose.model('DigitalProduct', digitalProductSchema);