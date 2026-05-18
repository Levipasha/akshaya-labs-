const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String, required: true },
  category: { type: String },
  material: { type: String, default: 'High-grade Industrial Composite' },
  warranty: { type: String, default: '12 Months Support' },
  availability: { type: String, default: 'Ready for Dispatch' },
  specifications: [{ name: String, value: String }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
