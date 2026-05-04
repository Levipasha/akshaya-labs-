const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const { upload } = require('../config/cloudinary');

// Get all partners
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a partner
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded. Please select a logo.' });
    }

    const partner = new Partner({
      name: req.body.name,
      img: req.file.path,
      order: req.body.order || 0
    });
    const newPartner = await partner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    console.error("ADD PARTNER ERROR:", err);
    res.status(400).json({ message: err.message || 'Error saving partner to database' });
  }
});

// Delete a partner
router.delete('/:id', async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Partner deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
