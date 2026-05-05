const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  story: {
    title: { type: String, default: "Our Journey & Excellence" },
    paragraphs: [{ type: String }],
    image: { type: String, default: "" }
  },
  stats: [{
    label: String,
    value: String,
    icon: String 
  }],
  facts: [{
    label: String,
    value: String
  }],
  statutoryProfile: {
    banker: String,
    gstNo: String
  },
  vendorBase: String,
  whyUs: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);
