import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, Briefcase, Star, CheckCircle } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  const stats = [
    { label: "Established", value: "2004", icon: <Calendar size={20} /> },
    { label: "Emplyees", value: "11 - 25", icon: <Users size={20} /> },
    { label: "Reviews", value: "5/5 Star", icon: <Star size={20} /> },
    { label: "Business", value: "Retailer", icon: <Briefcase size={20} /> },
  ];

  const facts = [
    { label: "Nature of Business", value: "Retailer" },
    { label: "Additional Business", value: "Retail Business" },
    { label: "Company CEO", value: "V Reddy" },
    { label: "Total Number of Employees", value: "11 to 25 People" },
    { label: "GST Registration Date", value: "Jul'17" },
    { label: "Legal Status of Firm", value: "Proprietorship" },
    { label: "Annual Turnover", value: "40 L - 1.5 Cr" },
  ];

  const whyUs = [
    "Fair business policies",
    "Stern quality control",
    "State-of-the-art infrastructural base",
    "Wide range of products",
    "Prompt delivery",
    "Dexterous team of professionals"
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Akshaya Sai Fiber Linings
          </motion.h2>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>Our Journey & Excellence</h3>
              <p>
                <strong>“Akshaya Sai Fiber Linings”</strong> is a Sole Proprietorship based entity, headquartered at Malkajgiri Maruthi Nagar, Hyderabad, Telangana with well-equipped facilities of manpower and machineries.
              </p>
              <p>
                Since 2004, it is ardently engrossed in the occupation of manufacturing and offering a flawless range of Chemical Fume Hood, Laboratory Bench, Air Blower and many more. The concentration of our firm is on developing an enhanced tomorrow and that’s why it is dedicated towards excellence and always tries to do pioneering implantations to become a future corporation.
              </p>
              <p>
                We always try to improve and evolve our skills by conducting intervallic seminars for the upcoming and most upgraded techniques.
              </p>
              
              <div className="stats-grid">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src={process.env.PUBLIC_URL + "/images/about .jpeg"} alt="Laboratory Infrastructure" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="factsheet-section">
        <div className="container">
          <div className="factsheet-grid">
            <div className="facts-info">
              <h3>Company Factsheet</h3>
              <div className="facts-table">
                {facts.map((fact, i) => (
                  <div key={i} className="fact-row">
                    <span className="fact-label">{fact.label}</span>
                    <span className="fact-value">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="statutory-info">
              <h3>Statutory Profile</h3>
              <div className="stat-card">
                <div className="stat-group">
                  <label>Banker</label>
                  <p>THE ADARSH COOPERATIVE URBAN BANK LTD</p>
                </div>
                <div className="stat-group">
                  <label>GST No.</label>
                  <p>36**********1ZV</p>
                </div>
              </div>

              <h3 className="vendor-title">Our Vendor Base</h3>
              <p className="vendor-text">
                In order to offer our clients the supreme quality range of products, we are in an authentic alliance with most reliable vendors of the market. We have selected them our vendors as they never negotiate the quality and packaging standards. They also have excellent financial stability, market standing and goodwill.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-us-section">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-header">
              <h3>Why Us?</h3>
              <p>We have marked the name of our firm in the list of foremost organizations of industry by serving excellently to the ever changing requirements of clients.</p>
            </div>
            <div className="why-us-list">
              {whyUs.map((item, i) => (
                <div key={i} className="why-item">
                  <CheckCircle size={20} className="check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
