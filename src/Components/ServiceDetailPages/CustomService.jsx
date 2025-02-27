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
              <a href="#contact">Contact</a>
            </nav>
  
            <section className="service-hero">
              <h1>Custom Service Plan</h1>
              <p>Tailored solutions for unique business needs</p>
            </section>
  
            <section className="service-features" id="features">
              <h2>Customizable Features</h2>
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
  
            <section className="service-benefits" id="benefits">
              <h2>Custom Benefits</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <h3>Tailored Experience</h3>
                  <p>Solutions designed specifically for your business</p>
                </div>
                <div className="benefit-item">
                  <h3>Flexible Pricing</h3>
                  <p>Pay only for the features you need</p>
                </div>
                <div className="benefit-item">
                  <h3>Dedicated Support</h3>
                  <p>Personal account manager and technical support</p>
                </div>
              </div>
            </section>
  
            <section className="service-cta">
              <h2>Build Your Custom Solution</h2>
              <p>Let's create the perfect plan for your business</p>
              <button className="cta-button">Schedule Consultation</button>
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