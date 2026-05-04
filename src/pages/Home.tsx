import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoTicker from '../components/LogoTicker';
import BentoGrid from '../components/BentoGrid';
import api from '../services/api';
import './Home.css';

interface HeroSlide {
  _id?: string;
  img: string;
  text: string[];
  subtext: string;
}

interface TestimonialData {
  _id?: string;
  img?: string;
  author: string;
  quote: string;
  role: string;
}

interface FounderData {
  _id?: string;
  name: string;
  subtitle: string;
  title: string;
  text: string;
  img: string;
  experience: string;
  projects: string;
}

interface InfoSectionData {
  title: string;
  description: string;
  btnText: string;
  btnLink: string;
  img: string;
}

const fallbackSlides: HeroSlide[] = [
  {
    _id: 'default-1',
    img: process.env.PUBLIC_URL + "/images/hero-1.jpeg",
    text: ["INNOVATING", "AKSHAYA LAB", "TECHNOLOGIES"],
    subtext: "fume hood lab funiture & lab fitting manufacturing & supplies"
  },
  {
    _id: 'default-2',
    img: process.env.PUBLIC_URL + "/images/hero-2.jpeg",
    text: ["CNC PRESS", "BRAKE"],
    subtext: "A high-performance CNC Press Brake used for precise bending of sheet metal. With advanced control, strong build quality, and high capacity, it ensures accurate and efficient fabrication for industrial applications like panels, machinery, and automotive parts."
  }
];

const Home: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(fallbackSlides);
  const [founder, setFounder] = useState<FounderData>({
    name: 'Mr. Vanket Reddy',
    subtitle: 'Meet Our Founder',
    title: 'Driving Excellence in Lab Technology',
    text: '"Our mission at Akshaya Lab Technologies is to bridge the gap between complex industrial needs and precise manufacturing solutions. We don\'t just supply equipment; we build the foundation for scientific breakthroughs."',
    img: process.env.PUBLIC_URL + "/images/owner.jpeg",
    experience: '15+',
    projects: '200+'
  });
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [infoSection, setInfoSection] = useState<InfoSectionData | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, founderRes, testimonialRes, infoRes] = await Promise.all([
          api.get('/hero'),
          api.get('/founder'),
          api.get('/testimonials'),
          api.get('/info-section')
        ]);
        if (heroRes.data.length > 0) setSlides(heroRes.data);
        if (founderRes.data) setFounder(founderRes.data);
        if (testimonialRes.data.length > 0) setTestimonials(testimonialRes.data);
        if (infoRes.data) setInfoSection(infoRes.data);
      } catch (err) {
        console.error('Error fetching dynamic content:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <section id="home" className="hero-new">
        <div className="slideshow">
          {slides.map((slide, i) => (
            <div
              key={slide._id || i}
              className={`slide ${i === current ? "active" : ""}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="slide-content">
                <div className="slide-text">
                  <div className="main-heading">
                    {slide.text.map((t, j) => (
                      <span key={j}>{t}</span>
                    ))}
                  </div>
                  <p className="slide-subtext">{slide.subtext}</p>
                </div>
              </div>
            </div>
          ))}

          {slides.length > 1 && (
            <div className="slideshow-controls">
              <button className="nav-arrow left" onClick={prevSlide}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <div className="counter">
                0{current + 1} / 0{slides.length}
              </div>
              <button className="nav-arrow right" onClick={nextSlide}>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>



      <BentoGrid />
      {/* Forced recompilation comment */}

      {/* Founder Section */}
      <section className="owner-section">
        <div className="container">
          <div className="owner-grid">
            <div className="owner-image-container">
              <div className="owner-card">
                <img 
                  src={founder.img} 
                  alt={`Founder of Akshaya Lab Technologies`} 
                  className="owner-photo" 
                />
                <div className="owner-badge">
                  <span>Founder & CEO</span>
                </div>
              </div>
            </div>
            <div className="owner-content">
              <span className="owner-subtitle">{founder.subtitle}</span>
              <h2 className="owner-title">{founder.title}</h2>
              <p className="owner-text">{founder.text}</p>
              <div className="owner-name-tag">
                <h3 className="owner-name">{founder.name}</h3>
                <p className="owner-position">Founder & Chief Executive Officer</p>
              </div>
              <div className="owner-stats">
                <div className="stat-item">
                  <span className="stat-number">{founder.experience}</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{founder.projects}</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Info Section */}
      <section className="dark-info-section">
        <div className="container">
          <div className="dark-info-grid">
            <div className="dark-info-left">
              <h2 className="dark-info-title">
                {infoSection ? (
                  infoSection.title.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}<br />
                    </React.Fragment>
                  ))
                ) : (
                  <>Creating infinite<br />possibilities</>
                )}
              </h2>
              <p className="dark-info-description">
                {infoSection ? infoSection.description : "We relentlessly innovate to elevate the versatility of steel, making it evolve into diverse applications - from bridges and buildings to packaging products, and consumer durables to automobiles."}
              </p>
              <Link to="/products" className="dark-info-btn">
                EXPLORE ALL OUR PRODUCTS
              </Link>
            </div>
            
            <div className="dark-info-right">
              <img 
                src={infoSection && infoSection.img ? infoSection.img : `${process.env.PUBLIC_URL}/images/hero-2.jpeg`} 
                alt="Steel Applications" 
                className="dark-info-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">Client Testimonials</h2>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={t._id || i} className="testimonial-card">
                  <div className="testimonial-image-wrapper">
                    <img src={t.img || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"} alt={t.author} className="testimonial-img" />
                    <div className="testimonial-overlay"></div>
                  </div>
                  <div className="testimonial-info">
                    <p className="testimonial-quote">“{t.quote}”</p>
                    <p className="testimonial-author">— {t.author}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <LogoTicker />
    </>
  );
};

export default Home;
