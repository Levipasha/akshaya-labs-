const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const t = new Testimonial({
    ...req.body,
    img: req.file ? req.file.path : req.body.img
  });
  try {
    const newT = await t.save();
    res.status(201).json(newT);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.img = req.file.path;
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
