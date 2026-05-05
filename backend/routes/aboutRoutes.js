const express = require('express');
const router = express.Router();
const About = require('../models/About');
const { upload } = require('../config/cloudinary');

// GET single about section
router.get('/', async (req, res, next) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.json(null);
    }
    res.json(about);
  } catch (err) {
    next(err);
  }
});

// POST update about section
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const {
      storyTitle,
      storyParagraphs,
      stats,
      facts,
      statutoryProfile,
      vendorBase,
      whyUs,
      image // If image URL is sent as a string
    } = req.body;

    const updateData = {};
    updateData.story = {};
    if (storyTitle) updateData.story.title = storyTitle;
    
    if (storyParagraphs) updateData.story.paragraphs = JSON.parse(storyParagraphs);
    if (stats) updateData.stats = JSON.parse(stats);
    if (facts) updateData.facts = JSON.parse(facts);
    if (statutoryProfile) updateData.statutoryProfile = JSON.parse(statutoryProfile);
    if (vendorBase !== undefined) updateData.vendorBase = vendorBase;
    if (whyUs) updateData.whyUs = JSON.parse(whyUs);

    // Get current about to preserve existing image if not updated
    let about = await About.findOne();
    
    if (req.file) {
      updateData.story.image = req.file.path;
    } else if (image) {
      updateData.story.image = image;
    } else if (about && about.story && about.story.image) {
      updateData.story.image = about.story.image;
    }

    if (about) {
      // Update existing
      about = await About.findOneAndUpdate({}, updateData, { new: true });
    } else {
      // Create new
      about = new About(updateData);
      await about.save();
    }

    res.json(about);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
