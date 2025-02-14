import React from 'react';
import { Zap, Cpu, HeadsetIcon, BarChart2, Wifi } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';

const PlusService = () => {
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
            <h1>Plus Service Plan</h1>
            <p>Advanced call center solution with enhanced performance</p>
          </section>

          <section className="service-features" id="features">
            <h2>Advanced Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <Zap className="feature-icon" />
                <h3>Low Latency Response</h3>
                <p>Lightning-fast call handling with optimized response times</p>
              </div>
              <div className="feature-item">
                <Cpu className="feature-icon" />
                <h3>Smart Filtering</h3>
                <p>Advanced AI-powered call filtering system</p>
              </div>
              <div className="feature-item">
                <HeadsetIcon className="feature-icon" />
                <h3>Live Monitoring</h3>
                <p>Real-time call monitoring and analytics</p>
              </div>
              <div className="feature-item">
                <BarChart2 className="feature-icon" />
                <h3>94% Accuracy</h3>
                <p>Enhanced accuracy for better call handling</p>
              </div>
            </div>
          </section>

          <section className="service-benefits" id="benefits">
            <h2>Plan Benefits</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h3>Enhanced Performance</h3>
                <p>Superior call handling capabilities with advanced features</p>
              </div>
              <div className="benefit-item">
                <h3>Real-time Analytics</h3>
                <p>Comprehensive monitoring and reporting tools</p>
              </div>
              <div className="benefit-item">
                <h3>Seamless Integration</h3>
                <p>Easy integration with existing systems and workflows</p>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Upgrade Your Call Center</h2>
            <p>Experience enhanced performance with our Plus plan</p>
            <button className="cta-button">Get Started</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlusService;