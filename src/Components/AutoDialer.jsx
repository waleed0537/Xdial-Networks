import React from 'react';
import { Rocket, Shield, Zap, Bell, Phone, BarChart, Settings, Repeat, Clipboard } from 'lucide-react';
import '../assets/css/ServiceDetails.css';
import shape54 from '../assets/images/shape/shape-54.png';
import { Link } from 'react-router-dom';

const AutoDialerService = () => {
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
            <h1>Auto Dialer</h1>
            <p>Advanced Outbound Solution for Maximum Contact Center Efficiency</p>
          </section>

          <section className="service-features" id="features">
            <div className="features-grid">
              <div className="feature-item">
                <Zap className="feature-icon" />
                <h3>High Speed Dialing</h3>
                <p>Automatically dials multiple numbers simultaneously with intelligent call distribution</p>
              </div>
              
              <div className="feature-item">
                <Shield className="feature-icon" />
                <h3>TPS/DNC Filtering</h3>
                <p>Automatically blocks numbers on Do-Not-Call lists with 99.9% accuracy</p>
              </div>

              <div className="feature-item">
                <Bell className="feature-icon" />
                <h3>Voicemail Detection</h3>
                <p>Smart detection system leaves pre-recorded messages on answering machines</p>
              </div>

              <div className="feature-item">
                <BarChart className="feature-icon" />
                <h3>Real-time Analytics</h3>
                <p>Live dashboard with call metrics, agent performance, and campaign statistics</p>
              </div>
            </div>
          </section>

          <section className="service-description" id="description">
            <div className="description-content">
              <h2 className="section-subtitle">Smart Dialing Solutions</h2>
              <div className="highlighted-text">
                The <strong>xDial Auto Dialer</strong> delivers 
                <span className="text-gradient"> enterprise-grade call automation</span>, 
                combining compliance with peak operational efficiency.
              </div>

              <div className="description-grid">
                <div className="description-point">
                  <div className="point-header">
                    <span className="point-icon">✓</span>
                    <h3>Compliance First</h3>
                  </div>
                  <p>
                    Integrated <strong>TPS/DNC scrubbing</strong> that automatically blocks restricted numbers, 
                    maintaining 100% regulatory compliance and preventing legal issues.
                  </p>
                </div>

                <div className="description-point">
                  <div className="point-header">
                    <span className="point-icon">✓</span>
                    <h3>Dialer Types</h3>
                  </div>
                  <p>
                    Choose from <strong>Predictive, Power, and Progressive</strong> - each optimized 
                    for specific campaign needs and agent workflows.
                  </p>
                </div>
              </div>

              <div className="use-cases">
                <h4>Key Features:</h4>
                <div className="case-tags">
                  <span className="tag">Press-1 Campaigns</span>
                  <span className="tag">Local CID</span>
                  <span className="tag">Auto Redial</span>
                  <span className="tag">Live Transfer</span>
                  <span className="tag">Call Recording</span>
                  <span className="tag">CRM Integration</span>
                </div>
              </div>

              <div className="dialer-types">
                <h3 className="types-title">Dialer Solutions</h3>
                <div className="types-grid">
                  <div className="type-card">
                    <Rocket className="type-icon" />
                    <h4>Predictive Dialer</h4>
                    <p>AI-powered dialing that predicts agent availability</p>
                  </div>
                  <div className="type-card">
                    <Zap className="type-icon" />
                    <h4>Power Dialer</h4>
                    <p>High-volume dialing with instant call connects</p>
                  </div>
                  <div className="type-card">
                    <Settings className="type-icon" />
                    <h4>Progressive Dialer</h4>
                    <p>Controlled pacing for sensitive campaigns</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Ready to Boost Your Outreach?</h2>
            <p>Transform your outbound operations with intelligent auto-dialing</p>
            <button className="cta-button" onClick={() => window.location.href = "/contact-form"}>
              Schedule Demo
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AutoDialerService;