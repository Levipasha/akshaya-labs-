const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  img: { type: String, required: true },
  text: [{ type: String }],
  subtext: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
