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
            <h1>Plus AI Agent</h1>
            <p>Advanced Call Handling with Smarter Filtering and Real-Time Monitoring</p>
          </section>

          <section className="service-features" id="features">
            <h2>Key Features</h2>
            <div className="features-grid">
              
              <div className="feature-item">
                <Zap className="feature-icon" />
                <h3>Low Latency</h3>
                <p>Quick response time for a smoother, more efficient call experience</p>
              </div>
              <div className="feature-item">
                <Cpu className="feature-icon" />
                <h3>Smarter Filtering</h3>
                <p>Enhanced speed and improved word detection with a broader range of filtering questions</p>
              </div>
              <div className="feature-item">
                <HeadsetIcon className="feature-icon" />
                <h3>Live Monitoring</h3>
                <p>Real-time tracking and intervention to improve call quality</p>
              </div>
              <div className="feature-item">
                <BarChart2 className="feature-icon" />
                <h3>Sentiment Analysis</h3>
                <p>Detects tone and emotions in conversations with 95% accuracy</p>
              </div>
            </div>
          </section>

          <section className="service-benefits" id="benefits">
            <h2>Business Benefits</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h3>Enhanced Call Intelligence</h3>
                <p>More intelligent call screening with improved accuracy and real-time insights</p>
              </div>
              <div className="benefit-item">
                <h3>Outbound Operations Optimization</h3>
                <p>Designed for high-performance outbound call centers with flexible inbound customization</p>
              </div>
              <div className="benefit-item">
                <h3>Superior Communication Experience</h3>
                <p>Faster response times and advanced sentiment detection for more effective interactions</p>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Ready to Elevate Your Call Operations?</h2>
            <p>Experience smarter, faster, and more efficient call handling</p>
            <button className="cta-button">Contact Sales</button>
          </section>

          <section className="sample-recordings" style={{color:"white"}}>
            <h3>Sample Call Recordings</h3>
            <p>______________________________________________</p>
            <button className="cta-button coming-soon" disabled>
              Coming Soon
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlusService;