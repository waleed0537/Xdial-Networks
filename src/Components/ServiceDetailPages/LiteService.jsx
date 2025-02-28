import React from 'react';
import { Shield, Phone, MessageSquare, BarChart2, Clock, Camera } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';

const LiteAIAgent = () => {
  return (
    <div className="service-detail-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
        <div className="service-detail-content">
          <nav className="nav-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="/contact-form">Contact</a>
          </nav>
          
          <section className="service-hero">
            <h1>AI Agent - xLite </h1>
            <p>Cost-Effective and Efficient Call Handling Solution</p>
          </section>
          
          <section className="service-features" id="features">
            <div className="features-grid">
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
            </div>
          </section>

          {/* New section with descriptive paragraph */}
         {/* In LiteService.jsx */}

         <section className="service-description" id="description">
  <div className="description-content1">
    <h2 className="section-subtitle">Overview</h2>
    <div className="highlighted-text">
      The <strong>Lite AI Agent</strong> is a 
      <span className="text-gradient"> cost-effective and efficient call handling solution</span>, designed for businesses that require essential call screening while optimizing VoIP usage.
    </div>
    
    <div className="description-grid">
      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Features</h3>
        </div>
        <p><strong>WebRTC-based</strong> with <strong>essential call screening</strong> for processing large call volumes, filtering out qualified customers, and reducing VoIP costs. Offers <strong>moderate latency</strong> and <strong>basic call filtering</strong> for initial call screening.</p>
      </div>

      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Benefits</h3>
        </div>
        <p>Detects <strong>98%</strong> of answering machines even before the call reaches our bot, saving valuable resources and optimizing efficiency.</p>
        </div>
    </div>

    <div className="use-cases">
      <h4>Perfect For:</h4>
      <div className="case-tags">
        <span className="tag">Outbound Call Centers</span>
        <span className="tag">Large Call Volumes</span>
        <span className="tag">Lead Qualification</span>
        <span className="tag">VoIP Cost Reduction</span>
      </div>
    </div>
  </div>
</section>
          
          <section className="service-cta">
            <h2>Ready to Enhance Your Call Center?</h2>
            <p>Discover how Lite AI Agent can transform your call operations</p>
            <button className="cta-button" onClick={() => window.location.href = "/contact-form"}>
              Contact Sales
            </button>
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