import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, User, Quote, Image as ImageIcon, Mail, LayoutGrid, LogOut } from 'lucide-react';
import ProductsManager from './pages/ProductsManager';
import HeroManager from './pages/HeroManager';
import FounderManager from './pages/FounderManager';
import TestimonialsManager from './pages/TestimonialsManager';
import MessagesManager from './pages/MessagesManager';
import CategoryManager from './pages/CategoryManager';
import PartnersManager from './pages/PartnersManager';
import BentoManager from './pages/BentoManager';
import InfoSectionManager from './pages/InfoSectionManager';
import AboutManager from './pages/AboutManager';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('adminAuth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="dashboard">
        <aside className="sidebar">
          <div className="sidebar-title">Admin Panel</div>
          <nav>
            <NavLink to="/hero" className="nav-link">
              <ImageIcon size={20} /> Hero Slides
            </NavLink>
            <NavLink to="/categories" className="nav-link">
              <LayoutGrid size={20} /> Categories
            </NavLink>
            <NavLink to="/bento" className="nav-link">
              <LayoutDashboard size={20} /> Bento Grid
            </NavLink>
            <NavLink to="/products" className="nav-link">
              <ShoppingBag size={20} /> Products
            </NavLink>
            <NavLink to="/partners" className="nav-link">
              <LayoutDashboard size={20} /> Brand Partners
            </NavLink>
            <NavLink to="/founder" className="nav-link">
              <User size={20} /> Founder Bio
            </NavLink>
            <NavLink to="/info-section" className="nav-link">
              <LayoutDashboard size={20} /> Info Section
            </NavLink>
            <NavLink to="/about" className="nav-link">
              <LayoutDashboard size={20} /> About Section
            </NavLink>
            <NavLink to="/testimonials" className="nav-link">
              <Quote size={20} /> Testimonials
            </NavLink>
            <NavLink to="/messages" className="nav-link">
              <Mail size={20} /> Messages
            </NavLink>
            
            <button onClick={handleLogout} className="nav-link logout-btn">
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/hero" element={<HeroManager />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/bento" element={<BentoManager />} />
            <Route path="/products" element={<ProductsManager />} />
            <Route path="/partners" element={<PartnersManager />} />
            <Route path="/founder" element={<FounderManager />} />
            <Route path="/info-section" element={<InfoSectionManager />} />
            <Route path="/about" element={<AboutManager />} />
            <Route path="/testimonials" element={<TestimonialsManager />} />
            <Route path="/messages" element={<MessagesManager />} />
            <Route path="/" element={
              <div className="card">
                <h1>Welcome to Akshaya Labs Admin</h1>
                <p>Manage your website content dynamically from here.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
