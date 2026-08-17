const express = require('express');
const router = express.Router();

// আপনার তৈরি করা কন্ট্রোলার ফাংশনগুলো ইমপোর্ট করা হলো
const { 
  createProduct, 
  getAllProducts, 
  getPendingProducts, 
  approveProduct, 
  deleteProduct 
} = require('../controllers/productController'); // কন্ট্রোলারের সঠিক পাথ

// মিডলওয়্যার (যদি টোকেন বা অথেন্টিকেশন চেক করতে চান, যেমন: verifyToken)
// const auth = require('../middleware/authMiddleware');

// রাউট ডিফিনিশন
router.post('/create', createProduct);                  // নতুন প্রোডাক্ট তৈরি
router.get('/', getAllProducts);                        // সব অ্যাপ্রুভড প্রোডাক্ট
router.get('/pending', getPendingProducts);             // পেন্ডিং প্রোডাক্ট (অ্যাডমিন)
router.put('/approve/:id', approveProduct);             // প্রোডাক্ট অ্যাপ্রুভ (অ্যাডমিন)
router.delete('/:id', deleteProduct);                   // প্রোডাক্ট ডিলিট

module.exports = router;