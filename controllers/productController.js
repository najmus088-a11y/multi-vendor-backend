const DigitalProduct = require('../models/DigitalProduct');

// 1. Create Digital Product (Seller/User)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, fileUrl, image } = req.body;

    const newProduct = new DigitalProduct({
      seller: req.user.id,
      title,
      description,
      category,
      price,
      fileUrl,
      image,
      status: 'pending' // নতুন প্রোডাক্ট সাবমিট হলে ডিফল্ট pending থাকবে
    });

    await newProduct.save();
    res.status(201).json({ message: 'Digital product submitted for approval successfully!', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get All Approved Digital Products (For Public Homepage)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await DigitalProduct.find({ status: 'approved' }).populate('seller', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Get Pending Products (For Admin Dashboard)
exports.getPendingProducts = async (req, res) => {
  try {
    const products = await DigitalProduct.find({ status: 'pending' }).populate('seller', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Approve Product (Admin Only)
exports.approveProduct = async (req, res) => {
  try {
    const product = await DigitalProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = 'approved';
    await product.save();

    res.status(200).json({ message: 'Product approved successfully!', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await DigitalProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};