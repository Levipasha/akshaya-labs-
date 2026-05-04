import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './BentoGrid.css';

const BentoGrid: React.FC = () => {
  const [bento, setBento] = useState({
    aboutText: 'At Akshaya Lab Technologies, we believe in more than just manufacturing equipment; we believe in shaping the future of scientific research and industrial innovation. Our sustainable and precision-first approach enables us to power laboratory growth, enrich research communities, and lead in cutting-edge manufacturing. Together, we\'re building a resilient, future-ready enterprise for a stronger tomorrow.',
    aboutBtnText: 'ABOUT AKSHAYA LABS',
    aboutBtnLink: '/about',
    stat1Value: '200+',
    stat1Label: 'Projects Delivered Globally',
    stat2Value: '15+',
    stat2Label: 'Years of Industry Experience',
    darkTitle: 'CLIENT SATISFACTION',
    darkValue: '99.8',
    darkTrend: '▲ 1.2 (0.5%)',
    darkDate: 'Updated 2026',
    darkBtnText: 'CONTACT US',
    darkBtnLink: '/contact',
    catalogTitle: 'PRODUCT CATALOG',
    catalogSubtitle: '2026 Edition',
    certValue: 'ISO',
    certLabel: '9001:2015 Certified Company'
  });

  useEffect(() => {
    const fetchBento = async () => {
      try {
        const res = await api.get('/bento');
        if (res.data) setBento(res.data);
      } catch (err) {
        console.error('Error fetching bento data:', err);
      }
    };
    fetchBento();
  }, []);

  return (
    <section className="bento-section">
      <div className="container">
        <div className="bento-grid">
          {/* Block 1: About */}
          <div className="bento-card bento-about">
            <p className="bento-about-text">{bento.aboutText}</p>
            <Link to={bento.aboutBtnLink} className="bento-btn">{bento.aboutBtnText}</Link>
          </div>

          {/* Block 2: Stats */}
          <div className="bento-card bento-stats">
            <div className="stat-group">
              <h3 className="stat-value">{bento.stat1Value}</h3>
              <p className="stat-label">{bento.stat1Label}</p>
            </div>
            <div className="stat-group">
              <h3 className="stat-value">{bento.stat2Value}</h3>
              <p className="stat-label">{bento.stat2Label}</p>
            </div>
          </div>


          {/* Block 4: Product Catalog (Grey Blue Box) */}
          <div className="bento-card bento-catalog">
            <p className="catalog-title">{bento.catalogTitle}</p>
            <h3 className="catalog-subtitle">{bento.catalogSubtitle}</h3>
            <div className="catalog-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
