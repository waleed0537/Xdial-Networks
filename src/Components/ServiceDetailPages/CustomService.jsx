import '../../assets/css/ServiceDetails.css';
import shape54 from '../../assets/images/shape/shape-54.png';
import { Settings,Wrench, Users, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
const CustomService = () => {
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
              <h1>AI Agent - xCustom</h1>
              <p>Tailored solutions for unique business needs</p>
            </section>
  
            <section className="service-features" id="features">
              
              <div className="features-grid">
                <div className="feature-item">
                  <Settings className="feature-icon" />
                  <h3>Flexible Configuration</h3>
                  <p>Fully customizable settings and workflows</p>
                </div>
                <div className="feature-item">
                  <Wrench className="feature-icon" />
                  <h3>Custom Integration</h3>
                  <p>Seamless integration with your existing tools</p>
                </div>
                <div className="feature-item">
                  <Users className="feature-icon" />
                  <h3>Scalable Solution</h3>
                  <p>Grows with your business needs</p>
                </div>
                <div className="feature-item">
                  <Sliders className="feature-icon" />
                  <h3>Adjustable Features</h3>
                  <p>Configure features based on your requirements</p>
                </div>
              </div>
            </section>
            {/* Add this section below the features grid */}
<section className="service-description" id="description">
  <div className="description-content1">
    <h2 className="section-subtitle">Bespoke AI Integration</h2>
    <div className="highlighted-text">
      The <strong>xCustom AI Agent</strong> offers 
      <span className="text-gradient"> 100% tailored call intelligence</span>, 
      engineered from the ground up for your unique operational DNA.
    </div>
    
    <div className="description-grid">
      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Core Customization</h3>
        </div>
        <p>
          Crafted for businesses requiring <strong>bespoke workflows</strong> and 
          <strong> proprietary integrations</strong>. Features API-first architecture with 
          <strong> 50+ pre-built connectors</strong> and custom SDK development for 
          legacy systems.
        </p>
      </div>

      <div className="description-point">
        <div className="point-header">
          <span className="point-icon">✓</span>
          <h3>Enterprise-Grade Flexibility</h3>
        </div>
        <p>
          Configure <strong>custom NLP models</strong>, 
          <strong> brand-specific personas</strong>, and 
          <strong> adaptive compliance protocols</strong>. Includes white-label options 
          and dedicated 24/7 engineering support with <strong>99.9% SLA</strong>.
        </p>
      </div>
    </div>

    <div className="use-cases">
      <h4>Specialized Solutions For:</h4>
      <div className="case-tags">
        <span className="tag">Healthcare Systems</span>
        <span className="tag">Financial Institutions</span>
        <span className="tag">Government Agencies</span>
        <span className="tag">Enterprise Ecosystems</span>
      </div>
    </div>
  </div>
</section>
  
          
  
            <section className="service-cta">
              <h2>Build Your Custom Solution</h2>
              <p>Let's create the perfect plan for your business</p>
              <button className="cta-button" onClick={() => window.location.href = "/contact-form"}>
  Schedule Consultaion
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

  export default CustomService;