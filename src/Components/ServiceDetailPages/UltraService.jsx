import React from 'react';
import { Award, Brain, Globe, Shield, BarChart2 } from 'lucide-react';
import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';

const UltraService = () => {
  return (
    <div className="service-detail-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
        <div className="service-detail-content">
          <nav className="nav-menu">
            <a href="/">Home</a>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="/contact-form">Contact</a>
          </nav>

          <section className="service-hero">
            <h1>AI Agent - xUltra </h1>
            <p>Enterprise-Grade AI for Intelligent Call Handling</p>
          </section>

          <section className="service-features" id="features">
            <div className="features-grid">
              <div className="feature-item">
                <Globe className="feature-icon" />
                <h3>Ultra-Fast Response Time</h3>
                <p>Near-instant responses for a seamless conversation experience</p>
              </div>
              <div className="feature-item">
                <Award className="feature-icon" />
                <h3>Advanced Sentiment Analysis</h3>
                <p>Higher accuracy in detecting emotions, intent, and contextual meaning</p>
              </div>
              <div className="feature-item">
                <Shield className="feature-icon" />
                <h3>Real-Time AI Call Monitoring</h3>
                <p>Live tracking with automated insights and recommendations</p>
              </div>
              <div className="feature-item">
                <BarChart2 className="feature-icon" />
                <h3>AI-Powered Adaptive Learning</h3>
                <p>Continuously improves through machine learning-driven enhancements</p>
              </div>
            </div>
          </section>

          {/* Enhanced Description Section */}
          <section className="service-description" id="description">
  <div className="description-content1">
    <h2 className="section-subtitle">Overview</h2>
    <div className="highlighted-text">
      The <strong>Ultra AI Agent</strong> is a 
      <span className="text-gradient"> high-performance AI-powered call handling solution</span> designed for businesses that require real-time decision-making, advanced speech recognition, and deeper conversation analysis.
    </div>
    
    <div className="description-grid">
      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Features</h3>
        </div>
        <p>
          <strong>Enterprise-Grade AI</strong> using real-time AI decision-making to optimize call handling. Features <strong>ultra-fast response time</strong> with near-instant responses for a seamless conversation experience and <strong>advanced sentiment & speech analysis</strong> with higher accuracy in detecting emotions, intent, and contextual meaning.
        </p>
      </div>

      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Benefits</h3>
        </div>
        <p>
          Includes <strong>real-time AI call monitoring</strong> with live tracking and automated insights, <strong>AI-powered adaptive learning</strong> that continuously improves through machine learning-driven enhancements, and the <strong>smartest filtering</strong> with customizable, complex question flows for deeper qualification.
        </p>
      </div>
    </div>

    <div className="use-cases">
      <h4>Perfect For:</h4>
      <div className="case-tags">
        <span className="tag">Large-Scale Operations</span>
        <span className="tag">Enterprises</span>
        <span className="tag">Inbound & Outbound Call Centers</span>
        <span className="tag">AI-Driven Automation</span>
      </div>
    </div>
  </div>
</section>

          <section className="service-cta">
            <h2>Maximize Your Call Operations</h2>
            <p>Transform your business with intelligent, real-time AI call handling</p>
            <button className="cta-button" onClick={() => window.location.href = "/contact-form"}>
              Contact Sales
            </button>
          </section>

          <section className="sample-recordings">
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

export default UltraService;