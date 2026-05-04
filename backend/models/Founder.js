const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  title: { type: String },
  text: { type: String },
  img: { type: String, required: true },
  experience: { type: String },
  projects: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Founder', founderSchema);
