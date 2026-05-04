const express = require('express');
const router = express.Router();
const InfoSection = require('../models/InfoSection');
const { upload, cloudinary } = require('../config/cloudinary');

// GET single info section
router.get('/', async (req, res, next) => {
  try {
    const infoSection = await InfoSection.findOne();
    if (!infoSection) {
      return res.json(null);
    }
    res.json(infoSection);
  } catch (err) {
    next(err);
  }
});

// POST update info section
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description };

    if (req.file) {
      updateData.img = req.file.path;
    } else if (req.body.image) {
      // In case we're sending a URL
      updateData.img = req.body.image;
    }

    let infoSection = await InfoSection.findOne();
    if (infoSection) {
      // Update existing
      infoSection = await InfoSection.findOneAndUpdate({}, updateData, { new: true });
    } else {
      // Create new
      infoSection = new InfoSection(updateData);
      await infoSection.save();
    }

    res.json(infoSection);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
