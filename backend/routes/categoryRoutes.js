const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const category = new Category({
    name: req.body.name,
    img: req.file ? req.file.path : ''
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("POST Category Error:", err);
    res.status(400).json({ message: err.message || 'Error saving category' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
