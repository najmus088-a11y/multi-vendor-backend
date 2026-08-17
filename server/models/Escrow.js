const mongoose = require('mongoose');

const escrowSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteListing', required: true },
  amount: { type: Number, required: true },
  commissionAmount: { type: Number, required: true }, // ১৫% কেটে রাখা অ্যামাউন্ট
  status: { 
    type: String, 
    enum: ['held', 'inspection', 'released', 'disputed'], 
    default: 'held' 
  },
  inspectionEndsAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Escrow', escrowSchema);