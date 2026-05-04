import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './LogoTicker.css';

interface Partner {
  _id: string;
  name: string;
  img: string;
}

const LogoTicker: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get('/partners');
        setPartners(res.data || []);
      } catch (err) {
        console.error("Error fetching partners:", err);
      }
    };
    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  // Ensure we have enough items to create a seamless infinite scroll even with few partners
  let scrollingItems = [...partners];
  while (scrollingItems.length < 10) {
    scrollingItems = [...scrollingItems, ...partners];
  }
  // Double it one last time to ensure the 50% translation is perfectly smooth
  scrollingItems = [...scrollingItems, ...scrollingItems];

  return (
    <div className="logo-ticker-section">
      <div className="container">
        <h3 className="section-subtitle">Trusted by Industry Leaders</h3>
        <div className="ticker-viewport">
          <div className="ticker-track">
            {scrollingItems.map((partner, index) => (
              <div key={`${partner._id}-${index}`} className="ticker-item">
                <div className="ticker-logo-box">
                  {partner.img && (
                    <img src={partner.img} alt={partner.name} className="ticker-partner-logo" />
                  )}
                </div>
                <div className="ticker-name-below">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
