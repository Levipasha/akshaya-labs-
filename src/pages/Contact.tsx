import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import api from '../services/api';
import './Contact.css';

const MailIcon = FaEnvelope as any;
const PhoneIcon = FaPhoneAlt as any;
const MapPinIcon = FaMapMarkerAlt as any;
const InstagramIcon = FaInstagram as any;
const WhatsappIcon = FaWhatsapp as any;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSending(true);
      
      // Explicitly construct the message object to ensure no field is dropped
      const messageData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        subject: "Website Inquiry" // Added subject for better visibility
      };

      await api.post('/contact', messageData);
      
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please check your internet and try again.');
    } finally {
      setIsSending(false);
    }
  };

  const contactCards = [
    {
      icon: <MailIcon className="card-icon" />,
      title: "Email Us",
      desc: "Send us an email anytime",
      value: "akshayalabnet@gmail.com",
      color: "#6366f1",
      link: "mailto:akshayalabnet@gmail.com"
    },
    {
      icon: <PhoneIcon className="card-icon" />,
      title: "Call Us",
      desc: "Mon-Fri from 9am to 6pm",
      value: "+91 9949942695",
      color: "#ec4899",
      link: "tel:+919949942695"
    },
    {
      icon: <MapPinIcon className="card-icon" />,
      title: "Visit Us",
      desc: "Come say hello",
      value: "C-2, Co-operative Industrial Estate, Balanagar, Hyderabad-500037",
      color: "#06b6d4",
      link: "#"
    },
    {
      icon: <InstagramIcon className="card-icon" />,
      title: "Follow Us",
      desc: "Stay updated with our latest",
      value: "@akshay_labs",
      color: "#ef4444",
      link: "https://instagram.com"
    },
    {
      icon: <WhatsappIcon className="card-icon" />,
      title: "WhatsApp Us",
      desc: "Chat with us directly",
      value: "Message Us",
      color: "#22c55e",
      link: "https://wa.me/919949942695"
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h2 className="section-title">Contact Us</h2>
      </div>

      <div className="contact-cards-container">
        {contactCards.map((card, index) => (
          <motion.a 
            href={card.link}
            key={index} 
            className="contact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="icon-wrapper" style={{ backgroundColor: card.color }}>
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
            <p className="card-value" style={{ color: card.color }}>{card.value}</p>
          </motion.a>
        ))}
      </div>

      <div className="message-section">
        <div className="message-container">
          <div className="message-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+91 9876543210" 
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Your Company" 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your project or inquiry..." 
                rows={5}
                required
              />
            </div>

            <button type="submit" className="send-btn" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="map-section-new">
        <h2 className="map-title">Find Us Here</h2>
        <div className="map-wrapper">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.8080312644265!2d78.44196817596!3d17.468962691500366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90f33984af5d%3A0xe549a16f4fc4ba5d!2sIndustrial%20Estate%2C%20Balanagar%2C%20Hyderabad%2C%20Telangana%20500037!5e0!3m2!1sen!2sin!4v1713271500000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '24px' }} 
            allowFullScreen={true} 
            loading="lazy" 
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
