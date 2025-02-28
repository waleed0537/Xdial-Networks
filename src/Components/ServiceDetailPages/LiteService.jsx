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
  <div className="description-content">
    <h2 className="section-subtitle">AI-Powered Efficiency</h2>
    <div className="highlighted-text">
      The <strong>xLite AI Agent</strong> is your entry-level solution for 
      <span className="text-gradient"> intelligent call management</span>, combining essential features with cost-effectiveness.
    </div>
    
    <div className="description-grid">
      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Core Functionality</h3>
        </div>
        <p>Designed for businesses requiring <strong>essential call screening</strong> and <strong>VoIP optimization</strong>, our xLite package handles <strong>200+ concurrent calls</strong> with 85% efficiency in lead qualification.</p>
      </div>

      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Technical Edge</h3>
        </div>
        <p>Features <strong>8-second voicemail detection</strong> (95% accuracy) and <strong>2.1s average response time</strong>, reducing wasted call minutes by up to 40% compared to basic IVR systems.</p>
      </div>
    </div>

    <div className="use-cases">
      <h4>Perfect For:</h4>
      <div className="case-tags">
        <span className="tag">Outbound Campaigns</span>
        <span className="tag">Lead Qualification</span>
        <span className="tag">Appointment Reminders</span>
        <span className="tag">Small Call Centers</span>
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