const mongoose = require('mongoose');

const infoSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('InfoSection', infoSectionSchema);
