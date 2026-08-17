const mongoose = require('mongoose');

const websiteListingSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  domainName: { type: String, required: true },
  niche: { type: String, required: true },
  monthlyRevenue: { type: Number, required: true },
  monthlyExpenses: { type: Number, required: true },
  traffic: { type: Number, required: true },
  monetizationType: { type: String, required: true }, // AdSense, Affiliate, etc.
  askingPrice: { type: Number, required: true },
  commissionRate: { type: Number, default: 15 }, // ১৫% কমিশন
  proofDocuments: [{ type: String }], // Analytics/Adsense screenshots or PDFs
  isVerified: { type: Boolean, default: false }, // DNS/CNAME Ownership Verification
  status: { type: String, enum: ['pending', 'approved', 'sold'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('WebsiteListing', websiteListingSchema);