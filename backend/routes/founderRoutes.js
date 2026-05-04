const express = require('express');
const router = express.Router();
const Founder = require('../models/Founder');
const { upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const founder = await Founder.findOne(); // Usually just one
    res.json(founder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const founder = new Founder({
    ...req.body,
    img: req.file ? req.file.path : req.body.img
  });
  try {
    const newFounder = await founder.save();
    res.status(201).json(newFounder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.img = req.file.path;
    const updated = await Founder.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
