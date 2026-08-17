const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/multi-vendor-ecommerce';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Database Connected Successfully!'))
  .catch((err) => console.log('Database Connection Failed:', err));

// Routes Import
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // প্রোডাক্ট রাউট ইমপোর্ট

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // প্রোডাক্ট রাউট মিডলওয়্যার হিসেবে যুক্ত করা

// Test Route
app.get('/', (req, res) => {
  res.send('Multi-Vendor & Digital Marketplace API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});