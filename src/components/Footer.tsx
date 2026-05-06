import React from "react";
import { FaFacebook as FaFacebookIcon, FaInstagram as FaInstagramIcon, FaLinkedin as FaLinkedinIcon, FaTwitter as FaTwitterIcon } from "react-icons/fa";
import './Footer.css';
import logoImg from '../logo.png';

const FaFacebook = FaFacebookIcon as any;
const FaInstagram = FaInstagramIcon as any;
const FaLinkedin = FaLinkedinIcon as any;
const FaTwitter = FaTwitterIcon as any;

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string; external?: boolean }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Products", href: "/products" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Application Support", href: "/services" },
      { name: "Laboratory Design", href: "/services" },
      { name: "Maintenance", href: "/services" },
      { name: "Consultation", href: "/services" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Email Us", href: "mailto:akshayalabnet@gmail.com" },
      { name: "Call Us", href: "tel:9949942695" },
      { name: "Location", href: "https://maps.google.com/?q=Cooperative+Industrial+Estate,+Balanagar,+Hyderabad,+Telangana+500018", external: true },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="social-icon" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="social-icon" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="social-icon" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="social-icon" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer: React.FC<FooterProps> = ({
  logo = {
    url: "/",
    src: "",
    alt: "Akshaya Labs",
    title: "Akshaya Labs",
  },
  sections = defaultSections,
  description = "Innovating the future through cutting-edge technology solutions. We provide comprehensive laboratory equipment, testing services, and technical support.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Akshaya Labs & Technology. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}) => {
  return (
    <section className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            {/* Logo */}
            <div className="footer-logo">
              <a href="/" className="logo-container">
                <img src={logoImg} alt="Akshaya Labs" className="logo-icon" />
                <span className="logo-text-new">AKSHAYA LAB<br/>TECHNOLOGIES</span>
              </a>
            </div>
            <p className="footer-description">
              {description}
            </p>
          </div>
          <div className="footer-links">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="footer-section-column">
                <h3 className="footer-section-title">{section.title}</h3>
                <ul className="footer-section-links">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">{copyright}</p>
          <ul className="legal-links">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
