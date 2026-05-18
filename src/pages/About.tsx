import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, Briefcase, Star, CheckCircle } from 'lucide-react';
import api from '../services/api';
import './About.css';

const IconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar size={20} />,
  Users: <Users size={20} />,
  Star: <Star size={20} />,
  Briefcase: <Briefcase size={20} />,
  Award: <Award size={20} />,
  CheckCircle: <CheckCircle size={20} />
};

const About: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await api.get('/about');
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch about data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const defaultStats = [
    { label: "Established", value: "2004", icon: <Calendar size={20} /> },
    { label: "Emplyees", value: "11 - 25", icon: <Users size={20} /> },
    { label: "Reviews", value: "5/5 Star", icon: <Star size={20} /> },
    { label: "Business", value: "Retailer", icon: <Briefcase size={20} /> },
  ];

  const defaultFacts = [
    { label: "Nature of Business", value: "Retailer" },
    { label: "Additional Business", value: "Retail Business" },
    { label: "Company CEO", value: "V Reddy" },
    { label: "Total Number of Employees", value: "11 to 25 People" },
    { label: "GST Registration Date", value: "Jul'17" },
    { label: "Legal Status of Firm", value: "Proprietorship" },
    { label: "Annual Turnover", value: "40 L - 1.5 Cr" },
  ];

  const defaultWhyUs = [
    "Fair business policies",
    "Stern quality control",
    "State-of-the-art infrastructural base",
    "Wide range of products",
    "Prompt delivery",
    "Dexterous team of professionals"
  ];

  const storyTitle = data?.story?.title || "Our Journey & Excellence";
  const storyParagraphs = data?.story?.paragraphs?.length ? data.story.paragraphs : [
    "<strong>“akshayalabtechnologies”</strong> is a Sole Proprietorship based entity, headquartered at Malkajgiri Maruthi Nagar, Hyderabad, Telangana with well-equipped facilities of manpower and machineries.",
    "Since 2004, it is ardently engrossed in the occupation of manufacturing and offering a flawless range of Chemical Fume Hood, Laboratory Bench, Air Blower and many more. The concentration of our firm is on developing an enhanced tomorrow and that’s why it is dedicated towards excellence and always tries to do pioneering implantations to become a future corporation.",
    "We always try to improve and evolve our skills by conducting intervallic seminars for the upcoming and most upgraded techniques."
  ];
  const storyImage = data?.story?.image || (process.env.PUBLIC_URL + "/images/about .jpeg");
  
  const stats = data?.stats?.length ? data.stats.map((s: any) => ({ ...s, icon: IconMap[s.icon] || <Calendar size={20} /> })) : defaultStats;
  const facts = data?.facts?.length ? data.facts : defaultFacts;
  
  const banker = data?.statutoryProfile?.banker || "THE ADARSH COOPERATIVE URBAN BANK LTD";
  const gstNo = data?.statutoryProfile?.gstNo || "36**********1ZV";
  const vendorBase = data?.vendorBase || "In order to offer our clients the supreme quality range of products, we are in an authentic alliance with most reliable vendors of the market. We have selected them our vendors as they never negotiate the quality and packaging standards. They also have excellent financial stability, market standing and goodwill.";
  
  const whyUs = data?.whyUs?.length ? data.whyUs : defaultWhyUs;

  if (loading) {
    return <div className="about-page" style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About akshayalabtechnologies
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
              <h3>{storyTitle}</h3>
              {storyParagraphs.map((p: string, i: number) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
              ))}
              
              <div className="stats-grid">
                {stats.map((stat: any, i: number) => (
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
              <img src={storyImage} alt="Laboratory Infrastructure" />
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
                {facts.map((fact: any, i: number) => (
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
                  <p>{banker}</p>
                </div>
                <div className="stat-group">
                  <label>GST No.</label>
                  <p>{gstNo}</p>
                </div>
              </div>

              <h3 className="vendor-title">Our Vendor Base</h3>
              <p className="vendor-text">
                {vendorBase}
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
              {whyUs.map((item: string, i: number) => (
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
