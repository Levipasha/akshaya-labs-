const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const heroRoutes = require('./routes/heroRoutes');
const productRoutes = require('./routes/productRoutes');
const founderRoutes = require('./routes/founderRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const bentoRoutes = require('./routes/bentoRoutes');
const infoSectionRoutes = require('./routes/infoSectionRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

app.use('/api/hero', heroRoutes);
app.use('/api/products', productRoutes);
app.use('/api/founder', founderRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/bento', bentoRoutes);
app.use('/api/info-section', infoSectionRoutes);
app.use('/api/about', aboutRoutes);

app.get('/api/test-cloudinary', async (req, res) => {
  const { cloudinary } = require('./config/cloudinary');
  try {
    const result = await cloudinary.api.ping();
    res.json({ status: 'ok', result });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Global Error Handler for Multer/Cloudinary/JSON errors
    app.use((err, req, res, next) => {
      console.error("GLOBAL ERROR:", err);
      res.status(500).json({ 
        message: err.message || "An internal server error occurred",
        error: process.env.NODE_ENV === 'development' ? err : {}
      });
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
