const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String, required: true },
  category: { type: String },
  specifications: [{ name: String, value: String }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
