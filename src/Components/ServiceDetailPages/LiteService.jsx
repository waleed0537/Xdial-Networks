import React from 'react';
import { Shield, Phone, MessageSquare, BarChart2, Clock } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';

const LiteService = () => {
  return (
    <div className="service-detail-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
        <div className="service-detail-content">
          <nav className="nav-menu">
            <a href="/">Home</a>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="#contact">Contact</a>
          </nav>

          <section className="service-hero">
            <h1>Lite Service Plan</h1>
            <p>Essential call center solution for growing businesses</p>
          </section>

          <section className="service-features" id="features">
            <h2>Core Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <Shield className="feature-icon" />
                <h3>Essential Call Screening</h3>
                <p>Basic call filtering system to ensure call quality and relevance</p>
              </div>
              <div className="feature-item">
                <Clock className="feature-icon" />
                <h3>Standard Response Time</h3>
                <p>Efficient call handling with moderate latency optimization</p>
              </div>
              <div className="feature-item">
                <MessageSquare className="feature-icon" />
                <h3>Voicemail Detection</h3>
                <p>Automated voicemail detection to improve agent efficiency</p>
              </div>
              <div className="feature-item">
                <BarChart2 className="feature-icon" />
                <h3>90% Accuracy</h3>
                <p>Reliable call classification and handling</p>
              </div>
            </div>
          </section>

          <section className="service-benefits" id="benefits">
            <h2>Plan Benefits</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h3>Perfect for Small Teams</h3>
                <p>Ideal solution for small to medium-sized call centers starting their optimization journey</p>
              </div>
              <div className="benefit-item">
                <h3>Cost-Effective</h3>
                <p>Affordable pricing with essential features to improve your call center operations</p>
              </div>
              <div className="benefit-item">
                <h3>Easy Integration</h3>
                <p>Simple setup process with existing call center infrastructure</p>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Ready to Get Started?</h2>
            <p>Transform your call center operations with our Lite plan</p>
            <button className="cta-button">Contact Sales</button>
          </section>
        </div>
      </div>
    </div>
  );
};
export default LiteService;