import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppWidget.css';

const WhatsappIcon = FaWhatsapp as any;

const WhatsAppWidget: React.FC = () => {
  const phoneNumber = "919949942695"; // From previous contact context
  const message = "Hello! I'm interested in your laboratory solutions.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-widget">
      <div className="whatsapp-message">
        <span>Need help? Chat with us!</span>
      </div>
      <a 
        href={whatsappUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappIcon size={32} />
        <span className="pulse"></span>
      </a>
    </div>
  );
};

export default WhatsAppWidget;
