const mongoose = require('mongoose');

const digitalProductSchema = new mongoose.Schema({
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  image: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved'], 
    default: 'pending' 
  },
}, { timestamps: true });

module.exports = mongoose.model('DigitalProduct', digitalProductSchema);