const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const { upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const hero = new Hero({
    img: req.file ? req.file.path : req.body.img,
    text: JSON.parse(req.body.text || "[]"),
    subtext: req.body.subtext
  });
  try {
    const newHero = await hero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.img = req.file.path;
    if (req.body.text) updateData.text = JSON.parse(req.body.text);
    
    const updated = await Hero.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hero slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
