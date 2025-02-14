import React from 'react';
import { Award, Brain, Globe, Shield, BarChart2 } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';
import PlusService from './PlusService';

const UltraService = () => {
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
            <h1>Ultra Service Plan</h1>
            <p>Enterprise-grade solution with premium features</p>
          </section>

          <section className="service-features" id="features">
            <h2>Premium Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <Award className="feature-icon" />
                <h3>99% Accuracy</h3>
                <p>Near-perfect call classification and handling</p>
              </div>
              <div className="feature-item">
                <Brain className="feature-icon" />
                <h3>AI-Powered Intelligence</h3>
                <p>Advanced machine learning algorithms for optimal performance</p>
              </div>
              <div className="feature-item">
                <Globe className="feature-icon" />
                <h3>Global Coverage</h3>
                <p>Worldwide support and localization features</p>
              </div>
              <div className="feature-item">
                <Shield className="feature-icon" />
                <h3>Enterprise Security</h3>
                <p>Military-grade security and compliance features</p>
              </div>
            </div>
          </section>

          <section className="service-benefits" id="benefits">
            <h2>Enterprise Benefits</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h3>Maximum Efficiency</h3>
                <p>Optimize your call center operations with premium features</p>
              </div>
              <div className="benefit-item">
                <h3>Complete Solution</h3>
                <p>All-in-one platform for inbound and outbound calls</p>
              </div>
              <div className="benefit-item">
                <h3>24/7 Support</h3>
                <p>Dedicated support team and priority assistance</p>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Experience Premium Performance</h2>
            <p>Transform your call center with our Ultra plan</p>
            <button className="cta-button">Contact Sales</button>
          </section>
        </div>
      </div>
    </div>
  );
};
export default UltraService;