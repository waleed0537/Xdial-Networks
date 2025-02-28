import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const MobileNavigation = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState(new Set());

  // Clean up effect when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-visible');
    };
  }, []);

  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('mobile-menu-visible');
  };

  const closeMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(false);
    document.body.classList.remove('mobile-menu-visible');
    setActiveDropdowns(new Set());
  };

  const handleDropdownClick = (e, dropdownId) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dropdownId)) {
        newSet.delete(dropdownId);
      } else {
        newSet.add(dropdownId);
      }
      return newSet;
    });
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = link;
    closeMenu();
  };

  return (
    <>
      <div className="mobile-nav-toggler" onClick={toggleMenu} style={{  marginLeft: "250px",borderRadius:"5px" }}> 
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </div>

      <div className={`mobile-menu${isMenuOpen ? ' mobile-menu-visible' : ''}`}>
        <div className="menu-backdrop" onClick={closeMenu}></div>
        <div className="close-btn" onClick={closeMenu}>
          <i className="fas fa-times"></i>
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <a href="/" onClick={(e) => handleNavClick(e, '/')}>
              <img src={logo} alt="" title="" />
            </a>
          </div>
          <div className="menu-outer">
            <ul className="navigation clearfix">
              <li className="dropdown">
                <a href="#" onClick={(e) => handleDropdownClick(e, 'home')}>
                  Home
                </a>
                <ul style={{ display: activeDropdowns.has('home') ? 'block' : 'none' }}>
                </ul>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNavClick(e, '/')}>About</a>
              </li>
              <li className="dropdown">
                <a href="#" onClick={(e) => handleDropdownClick(e, 'services')}>
                  Services
                </a>
                <ul style={{ display: activeDropdowns.has('services') ? 'block' : 'none' }}>
                  <li className="dropdown">
                    <a href="#" onClick={(e) => handleDropdownClick(e, 'aiAgents')}>AI Agents</a>
                    <ul style={{ display: activeDropdowns.has('aiAgents') ? 'block' : 'none' }}>
                      <li><Link to="/services/lite" onClick={(e) => handleNavClick(e, '/services/lite')}>Lite</Link></li>
                      <li><Link to="/services/plus" onClick={(e) => handleNavClick(e, '/services/plus')}>Plus</Link></li>
                      <li><Link to="/services/ultra" onClick={(e) => handleNavClick(e, '/services/ultra')}>Ultra</Link></li>
                      <li><Link to="/services/custom" onClick={(e) => handleNavClick(e, '/services/custom')}>Custom</Link></li>
                    </ul>
                  </li>
                  <li><a href="#" onClick={(e) => handleNavClick(e, '/services/auto-dialer')}>Auto Dialer</a></li>
                  <li><a href="#" onClick={(e) => handleNavClick(e, '/services/voip')}>VoIP</a></li>
                </ul>
              </li>
              <li>
                <a href="/contact-form" onClick={(e) => handleNavClick(e, '/contact-form')}>Contact Form</a>
              </li>
            </ul>
          </div>
          {/* <div className="contact-info">
            <h4>Contact Info</h4>
            <ul>
              <li>Chicago 12, Melborne City, USA</li>
              <li><a href="tel:+8801682648101">+88 01682648101</a></li>
              <li><a href="mailto:info@example.com">info@example.com</a></li>
            </ul>
          </div> */}
          <div className="social-links">
            <ul className="clearfix">
              <li><a href="#"><span className="fab fa-twitter"></span></a></li>
              <li><a href="#"><span className="fab fa-facebook-square"></span></a></li>
              <li><a href="#"><span className="fab fa-pinterest-p"></span></a></li>
              <li><a href="#"><span className="fab fa-instagram"></span></a></li>
              <li><a href="#"><span className="fab fa-youtube"></span></a></li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;