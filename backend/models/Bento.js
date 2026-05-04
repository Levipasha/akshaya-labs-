const mongoose = require('mongoose');

const bentoSchema = new mongoose.Schema({
  aboutText: { type: String, default: 'At Akshaya Lab Technologies...' },
  aboutBtnText: { type: String, default: 'ABOUT AKSHAYA LABS' },
  aboutBtnLink: { type: String, default: '/about' },
  
  stat1Value: { type: String, default: '200+' },
  stat1Label: { type: String, default: 'Projects Delivered Globally' },
  stat2Value: { type: String, default: '15+' },
  stat2Label: { type: String, default: 'Years of Industry Experience' },
  
  darkTitle: { type: String, default: 'CLIENT SATISFACTION' },
  darkValue: { type: String, default: '99.8' },
  darkTrend: { type: String, default: '▲ 1.2 (0.5%)' },
  darkDate: { type: String, default: 'Updated 2026' },
  darkBtnText: { type: String, default: 'CONTACT US' },
  darkBtnLink: { type: String, default: '/contact' },
  
  catalogTitle: { type: String, default: 'PRODUCT CATALOG' },
  catalogSubtitle: { type: String, default: '2026 Edition' },
  
  certValue: { type: String, default: 'ISO' },
  certLabel: { type: String, default: '9001:2015 Certified Company' }
}, { timestamps: true });

module.exports = mongoose.model('Bento', bentoSchema);
