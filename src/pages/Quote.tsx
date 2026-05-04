import React, { useState } from 'react';
import api from '../services/api';
import './Quote.css';

const Quote: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    project: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSending(true);
      
      // Prepare data for the Messages collection
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: `Quote Request: ${formData.service}`,
        message: `SERVICE: ${formData.service}\n\nPROJECT: ${formData.project}\n\nADDITIONAL INFO: ${formData.message}`
      };

      await api.post('/contact', payload);
      
      alert('Thank you for your quote request! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        project: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting quote:', err);
      alert('Failed to submit quote request. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="quote">
      <div className="container">
        <h2 className="section-title">Request a Quote</h2>
        <div className="quote-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Service Type *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="application-support">Application Support</option>
                  <option value="laboratory-design">Laboratory Design & Engineering</option>
                  <option value="maintenance">Preventive Maintenance</option>
                  <option value="consultation">Pre-sales Consultation</option>
                  <option value="training">Installation & Training</option>
                  <option value="testing">Testing Services</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="project">Project Description *</label>
                <textarea
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  rows={4}
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="message">Additional Information</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us more about your project requirements..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? 'Sending Request...' : 'Submit Quote Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Quote;
