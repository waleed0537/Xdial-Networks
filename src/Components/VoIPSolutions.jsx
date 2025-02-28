import React from 'react';
import { Wallet, Globe, Lock, PhoneForwarded, Voicemail, Rocket } from 'lucide-react';
import '../assets/css/ServiceDetails.css';
import shape54 from '../assets/images/shape/shape-54.png';
import { Link } from 'react-router-dom';

const VoIPService = () => {
  return (
    <div className="service-detail-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
        <div className="service-detail-content">
          <nav className="nav-menu">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="/contact-form">Contact</a>
          </nav>

          <section className="service-hero">
            <h1>VoIP Solutions</h1>
            <p>Smart Communication Infrastructure with Transparent Financial Control</p>
          </section>

          <section className="service-features" id="features">
            <div className="features-grid">
              <div className="feature-item">
                <Wallet className="feature-icon" />
                <h3>Real-time Billing</h3>
                <p>Instant balance tracking and expenditure analytics with millisecond precision</p>
              </div>
              
              <div className="feature-item">
                <Globe className="feature-icon" />
                <h3>Global Access</h3>
                <p>Manage your communications and finances from anywhere in the world</p>
              </div>

              <div className="feature-item">
                <PhoneForwarded className="feature-icon" />
                <h3>Click-to-Call</h3>
                <p>Web-initiated instant connections with customer support teams</p>
              </div>

              <div className="feature-item">
                <Lock className="feature-icon" />
                <h3>Security & Compliance</h3>
                <p>Military-grade encryption and financial data protection</p>
              </div>
            </div>
          </section>

          <section className="service-description" id="description">
            <div className="description-content">
              <h2 className="section-subtitle">Intelligent Communication</h2>
              <div className="highlighted-text">
                <strong>xDial VoIP</strong> delivers 
                <span className="text-gradient"> enterprise-grade telephony </span> 
                with complete financial transparency and control.
              </div>

              <div className="description-grid">
                <div className="description-point">
                  <div className="point-header">
                    <span className="point-icon">✓</span>
                    <h3>Financial Oversight</h3>
                  </div>
                  <p>
                    Our <strong>AI-powered billing portal</strong> provides real-time balance updates, 
                    expenditure breakdowns, and predictive cost analytics with 99.99% accuracy.
                  </p>
                </div>

                <div className="description-point">
                  <div className="point-header">
                    <span className="point-icon">✓</span>
                    <h3>Advanced Features</h3>
                  </div>
                  <p>
                    Harness <strong>predictive dialing</strong>, 
                    <strong> ringless voicemail</strong>, and 
                    <strong> instant call initiation</strong> through seamless web integration.
                  </p>
                </div>
              </div>

              <div className="use-cases">
                <h4>Core Capabilities:</h4>
                <div className="case-tags">
                  <span className="tag">Balance Tracking</span>
                  <span className="tag">Global Access</span>
                  <span className="tag">Encrypted Calls</span>
                  <span className="tag">Call Analytics</span>
                  <span className="tag">Voicemail Drops</span>
                  <span className="tag">CRM Integration</span>
                </div>
              </div>

              <div className="voip-solutions">
                <h3 className="types-title">Premium Solutions</h3>
                <div className="types-grid">
                  <div className="type-card">
                    <Rocket className="type-icon" />
                    <h4>Predictive Dialing</h4>
                    <p>AI-optimized call distribution for maximum agent efficiency</p>
                  </div>
                  <div className="type-card">
                    <Voicemail className="type-icon" />
                    <h4>Ringless Voicemail</h4>
                    <p>Direct message delivery to voicemail boxes</p>
                  </div>
                  <div className="type-card">
                    <PhoneForwarded className="type-icon" />
                    <h4>Instant Connect</h4>
                    <p>One-click customer support initiation</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Ready to Revolutionize Your Communications?</h2>
            <p>Implement smart VoIP solutions with complete financial control</p>
            <button className="cta-button" onClick={() => window.location.href = "/contact-form"}>
              Get Started
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VoIPService;