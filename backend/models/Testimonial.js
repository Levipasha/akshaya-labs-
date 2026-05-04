const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  role: { type: String },
  img: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
