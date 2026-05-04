const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String } // Optional image for category cards
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
