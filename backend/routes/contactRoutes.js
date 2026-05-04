const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Admin only (ideally)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Use from public contact form
router.post('/', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  
  // DEBUG CHECK: Remove this after verification if needed
  if (!phone || phone.trim() === '') {
    // We are temporarily making it required to see if it reaches the server
    // return res.status(400).json({ message: 'Phone number is missing in the request!' });
  }

  const msg = new Message({
    name,
    email,
    phone: phone || "NONE_GIVEN", // Fallback to see if it's saving at least something
    company,
    subject,
    message
  });
  
  try {
    const newMsg = await msg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
