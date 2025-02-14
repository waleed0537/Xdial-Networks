import React from 'react';
import {
  Phone,
  Globe2,
  Users,
  Bot,
  HeadsetIcon,
  BarChart2,
  Share2,
  Shield,
  Languages,
  Clock,
  Settings,
  MessageSquare
} from 'lucide-react';
import '../assets/css/Service1.css';
import shape54 from '../assets/images/shape/shape-54.png';
import shape55 from '../assets/images/shape/shape-55.png';

const AutoDialerService = () => {
  return (
    <>
    
    <div className="security-service-container">
    <div
  className="pattern-layer"
  style={{
    backgroundImage: `url(${shape54})`,
    backgroundSize: "2000px 2000px", // Set width and height manually
    backgroundRepeat: "no-repeat", // Prevent repeating if needed
  }}
>

      {/* Hero Section */}
      
        <section className="hero-section">

          <div className="hero-content">
            <nav className="nav-menu">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#agent-program">Agent Program</a>
              <a href="#contact">Contact Us</a>
            </nav>

            <div className="hero-main-content">
              <div className="hero-text">
                <h1>Advanced Dialer Solutions</h1>
                <p>Powerful, scalable, and fully customized VICIdial solutions for modern call centers</p>
                <button className="get-started-btn">Get Started</button>
              </div>
              <div className="hero-image">
                <img src="src\assets\images\autodialer.jpg" alt="Auto Dialer Solution Illustration" />
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="description-section">
          <div className="description-content">
            <div className="description-icon">
              <Phone />
            </div>
            <p className="description-text">
              At XDial Networks, we specialize in delivering powerful, scalable, and fully customized VICIdial dialer solutions
              tailored to your call center needs. As the world's most popular open-source contact center solution, VICIdial is
              deployed in over 14,000 installations across 100+ countries.
            </p>
            <p className="description-text">
              Supporting businesses of all sizes—from small teams of 5 agents to enterprise-level call centers with 500+ agents,
              handling over a million calls seamlessly.
            </p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="statistics-section">
          <div className="stats-container">
            <div className="stat-item">
              <h3>14K+</h3>
              <p>Global Installations</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Countries Served</p>
            </div>
            <div className="stat-item">
              <h3>16+</h3>
              <p>Languages Available</p>
            </div>
            <div className="stat-item">
              <h3>1M+</h3>
              <p>Daily Calls Handled</p>
            </div>
          </div>

        </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="inner-container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Settings size={24} />
              </div>
              <h3>Custom VICIdial Development</h3>
              <p>Tailored solutions designed to match your specific operational requirements and workflow.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Share2 size={24} />
              </div>
              <h3>Seamless Integration</h3>
              <p>Effortless integration with your existing VoIP systems and CRM platforms.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BarChart2 size={24} />
              </div>
              <h3>Performance Optimization</h3>
              <p>Maximized efficiency and scalability for handling high call volumes.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Bot size={24} />
              </div>
              <h3>AI-Driven Automation</h3>
              <p>Smart call handling and automated processes for improved efficiency.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HeadsetIcon size={24} />
              </div>
              <h3>24/7 Expert Support</h3>
              <p>Round-the-clock technical support and maintenance services.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Languages size={24} />
              </div>
              <h3>Multilingual Interface</h3>
              <p>Available in 16 different languages with custom translation options.</p>
            </div>
          </div>

        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="compliance-section">
        <div className="compliance-content">
          <h2>Why Choose XDial Networks</h2>
          <div className="compliance-grid">
            <div className="compliance-item">
              <div className="compliance-icon">
                <Globe2 size={24} />
              </div>
              <h3>Global Reach</h3>
              <p>Trusted by businesses across 100+ countries with proven success.</p>
            </div>
            <div className="compliance-item">
              <div className="compliance-icon">
                <Shield size={24} />
              </div>
              <h3>Reliable & Secure</h3>
              <p>Enterprise-grade security and stability for mission-critical operations.</p>
            </div>
            <div className="compliance-item">
              <div className="compliance-icon">
                <Users size={24} />
              </div>
              <h3>Scalable Solution</h3>
              <p>From small teams to 500+ agent call centers, we scale with your needs.</p>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>What is VICIdial?</h3>
            <p>VICIdial is the world's leading open-source contact center solution, offering powerful features for call handling, agent management, and customer interaction.</p>
          </div>
          <div className="faq-item">
            <h3>How scalable is the solution?</h3>
            <p>Our solution scales from small teams of 5 agents to large enterprises with 500+ agents, handling millions of calls daily.</p>
          </div>
          <div className="faq-item">
            <h3>What kind of support do you offer?</h3>
            <p>We provide 24/7 expert technical support, maintenance, and continuous optimization services.</p>
          </div>
          <div className="faq-item">
            <h3>Can it integrate with our existing systems?</h3>
            <p>Yes, we offer seamless integration with various VoIP systems, CRM platforms, and other business tools.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Call Center?</h2>
          <p>Upgrade to a tailor-made VICIdial solution crafted for maximum efficiency and reliability.</p>
          <button className="cta-button">Schedule a Demo</button>
        </div>
      </section>

    </div >
    </div>
    </>
  );
};

export default AutoDialerService;