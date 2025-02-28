import React from 'react';
import { Zap, Cpu, HeadsetIcon, BarChart2, Wifi } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';
import { useNavigate } from 'react-router-dom';

const PlusService = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="service-detail-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
        <div className="service-detail-content">
          <nav className="nav-menu">
            <a href="/">Home</a>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="/contact-form" onClick={(e) => handleNavigation(e, '/contact-form')}>Contact</a>
          </nav>
          
          <section className="service-hero">
            <h1>AI Agent - xPlus </h1>
            <p>Advanced Call Handling with Smarter Filtering and Real-Time Monitoring</p>
          </section>
          
          <section className="service-features" id="features">            
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

          {/* Enhanced Description Section */}
          <section className="service-description" id="description">
  <div className="description-content1">
    <h2 className="section-subtitle">Overview</h2>
    <div className="highlighted-text">
      The <strong>Plus AI Agent</strong> is an 
      <span className="text-gradient"> advanced call handling solution</span> designed for businesses that require faster response times, smarter filtering, and real-time monitoring.
    </div>
    
    <div className="description-grid">
      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Features</h3>
        </div>
        <p>
          <strong>Soft Phone-Based</strong> with port-enabled technology ensuring enhanced call handling and seamless connectivity. Provides <strong>advanced call handling</strong> with faster response time than Lite, ensuring better call flow and efficiency.
        </p>
      </div>

      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Benefits</h3>
        </div>
        <p>
          Features <strong>sentiment analysis</strong> with 95% accuracy in word and sentiment detection, <strong>live monitoring</strong> for real-time tracking and intervention, and <strong>smarter filtering</strong> with enhanced speed, improved word detection, and a broader range of filtering questions.
        </p>
      </div>
    </div>

    <div className="use-cases">
      <h4>Perfect For:</h4>
      <div className="case-tags">
        <span className="tag">Outbound Call Centers</span>
        <span className="tag">High-Performance Operations</span>
        <span className="tag">Real-Time Insights</span>
        <span className="tag">Intelligent Call Screening</span>
      </div>
    </div>
  </div>
</section>
          
          <section className="service-cta">
            <h2>Ready to Elevate Your Call Operations?</h2>
            <p>Experience smarter, faster, and more efficient call handling</p>
            <button 
              className="cta-button" 
              onClick={() => navigate('/contact-form')}
            >
              Contact Sales
            </button>
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