import React from 'react';
import { Shield, Phone, MessageSquare, BarChart2, Clock, Camera } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';
import { Link } from 'react-router-dom';
const LiteAIAgent = () => {
  return (
    <div className="service-detail-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
        <div className="service-detail-content">
          <nav className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="#contact">Contact</a>
          </nav>

          <section className="service-hero">
            <h1>Lite AI Agent</h1>
            <p>Cost-Effective and Efficient Call Handling Solution</p>
          </section>

          <section className="service-features" id="features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <Camera className="feature-icon" />
                <h3>WebRTC-Based</h3>
                <p>Seamless and efficient web-based call handling technology</p>
              </div>
              <div className="feature-item">
                <Shield className="feature-icon" />
                <h3>Essential Call Screening</h3>
                <p>Process large call volumes and filter qualified customers effectively</p>
              </div>
              <div className="feature-item">
                <Clock className="feature-icon" />
                <h3>Moderate Latency</h3>
                <p>Efficient call processing with minimal response delay</p>
              </div>
              <div className="feature-item">
                <MessageSquare className="feature-icon" />
                <h3>Voicemail Detection</h3>
                <p>95% accurate early-stage voicemail identification within 8 seconds</p>
              </div>
              <div className="feature-item">
                <Phone className="feature-icon" />
                <h3>Recorded Call Playback</h3>
                <p>Enable comprehensive call monitoring and performance analysis</p>
              </div>
              <div className="feature-item">
                <BarChart2 className="feature-icon" />
                <h3>Portal Reporting</h3>
                <p>Gain insights into call activity and refine strategic approaches</p>
              </div>
            </div>
          </section>

          <section className="service-benefits" id="benefits">
            <h2>Business Benefits</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h3>Cost-Effective Solution</h3>
                <p>Reduce operational costs while maintaining efficient call screening capabilities</p>
              </div>
              <div className="benefit-item">
                <h3>Outbound Call Center Optimization</h3>
                <p>Primarily designed for outbound operations with flexible inbound customization</p>
              </div>
              <div className="benefit-item">
                <h3>Scalable AI Integration</h3>
                <p>Reliable AI-powered call handling without unnecessary complexity</p>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Ready to Enhance Your Call Center?</h2>
            <p>Discover how Lite AI Agent can transform your call operations</p>
            <button className="cta-button">Contact Sales</button>
          </section>

          <section className="sample-recordings">
            <h3>Sample Call Recordings</h3>
            <button className="cta-button coming-soon" disabled>
              Coming Soon
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LiteAIAgent;