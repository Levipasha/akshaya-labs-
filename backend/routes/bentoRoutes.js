const express = require('express');
const router = express.Router();
const Bento = require('../models/Bento');

// Get Bento Grid data
router.get('/', async (req, res) => {
  try {
    let bento = await Bento.findOne();
    if (!bento) {
      // Create default if not exists
      bento = await Bento.create({});
    }
    res.json(bento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Bento Grid data
router.put('/', async (req, res) => {
  try {
    let bento = await Bento.findOne();
    if (!bento) {
      bento = new Bento(req.body);
    } else {
      const updateData = { ...req.body };
      delete updateData._id;
      delete updateData.__v;
      delete updateData.createdAt;
      delete updateData.updatedAt;
      Object.assign(bento, updateData);
    }
    const updatedBento = await bento.save();
    res.json(updatedBento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
