import React from 'react';
import './Services.css';

const Services: React.FC = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Our Service Solutions</h2>
        <div className="services-description">
          <p>We provide both on-site and off-site support to ensure that every installation is maintained and configured to bring out consistent results for our customers.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-wrench"></i>
            </div>
            <h3>Application Support</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Multi vendor service contracts</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-cogs"></i>
            </div>
            <h3>Laboratory design & engineering</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Pre-sales consultation</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Installation & Training</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Preventive Maintenance</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-laptop"></i>
            </div>
            <h3>After Sales Support</h3>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-flask"></i>
            </div>
            <h3>Geological & mineral testing services</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
