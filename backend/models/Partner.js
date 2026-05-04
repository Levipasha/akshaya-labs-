const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true }, // Logo image URL
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Partner', PartnerSchema);
