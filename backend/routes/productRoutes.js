const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../config/cloudinary');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product
router.post('/', upload.single('image'), async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    img: req.file ? req.file.path : req.body.img,
    category: req.body.category,
    material: req.body.material,
    warranty: req.body.warranty,
    availability: req.body.availability
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("POST Product Error:", err);
    res.status(500).json({ message: err.message || 'Server error during product creation' });
  }
});

// Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.img = req.file.path;
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    console.error("PUT Product Error:", err);
    res.status(500).json({ message: err.message || 'Server error during product update' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
