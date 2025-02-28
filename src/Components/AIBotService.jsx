import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Service1.css';
import { 
  Bot, 
  Phone, 
  BarChart2, 
  Languages, 
  Brain, 
  Shield 
} from 'lucide-react';
import shape54 from '../assets/images/shape/shape-54.png';
const AIBotService = () => {
  return (
    <>
        <div className="security-service-container">
      <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}>
      {/* Hero Section */}
      <section className="hero-section">
    <div className="hero-content">
        <nav className="nav-menu">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#agent-program">Agent Program</a>
            <a href="/contact-form">Contact Us</a>
        </nav>
        
        <div className="hero-main-content">
            <div className="hero-text">
                <h1>AI Bot & VoIP Solutions</h1>
                <p>Transform your customer interactions with intelligent AI-powered communication</p>
                <button className="get-started-btn">Get started</button>
            </div>
            <div className="hero-image">
                <img src="src\assets\images\check1.png" alt="AI Bot and VoIP Illustration" />
            </div>
        </div>
    </div>
</section>

      {/* Description Section */}
      <section className="description-section">
        <div className="description-content">
          
          <p className="description-text">
            Our AI Bot & VoIP solution combines cutting-edge artificial intelligence with enterprise-grade voice communication technology. 
            The system provides intelligent automated responses while maintaining the natural flow of conversation, ensuring your customers 
            receive immediate, accurate assistance 24/7.
          </p>
          <p className="description-text">
            With advanced natural language processing and machine learning capabilities, our AI bots continuously learn and improve, 
            providing increasingly personalized and effective customer service while seamlessly integrating with your existing VoIP infrastructure.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>95%</h3>
            <p>Resolution Rate</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>AI Support</p>
          </div>
          <div className="stat-item">
            <h3>40+</h3>
            <p>Languages Supported</p>
          </div>
          <div className="stat-item">
            <h3>60%</h3>
            <p>Cost Reduction</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
  <h2>Key Features</h2>
  <div className="features-grid">
    <div className="feature-card">
      <div className="feature-icon">
        <Bot size={24} />
      </div>
      <h3>Natural Language Processing</h3>
      <p>Advanced AI that understands context and intent for more natural conversations.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <Phone size={24} />
      </div>
      <h3>Enterprise VoIP Integration</h3>
      <p>Seamless integration with existing phone systems and communication infrastructure.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <BarChart2 size={24} />
      </div>
      <h3>Real-time Analytics</h3>
      <p>Comprehensive insights into customer interactions and bot performance.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <Languages size={24} />
      </div>
      <h3>Multilingual Support</h3>
      <p>AI-powered translation and support for over 40 languages.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <Brain size={24} />
      </div>
      <h3>Continuous Learning</h3>
      <p>Self-improving AI that gets better with each interaction.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <Shield size={24} />
      </div>
      <h3>Enterprise Security</h3>
      <p>Bank-grade encryption and security protocols for all communications.</p>
    </div>
  </div>
</section>
</div>
      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>How does the AI Bot understand customer intent?</h3>
            <p>Our AI uses advanced natural language processing to analyze context, sentiment, and intent, ensuring accurate understanding of customer queries.</p>
          </div>
          <div className="faq-item">
            <h3>Can it integrate with our existing systems?</h3>
            <p>Yes, our solution offers seamless integration with all major VoIP systems and CRM platforms.</p>
          </div>
          <div className="faq-item">
            <h3>What languages are supported?</h3>
            <p>We support over 40 languages with real-time translation capabilities.</p>
          </div>
          <div className="faq-item">
            <h3>How secure is the platform?</h3>
            <p>We implement enterprise-grade security with end-to-end encryption and compliance with international security standards.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Customer Service?</h2>
          <p>Join thousands of businesses using our AI Bot & VoIP solution to deliver exceptional customer experiences.</p>
          <button className="cta-button" style={{background: 'linear-gradient(90deg, #45ACAB 0%, #4788AC 100%)'}}>Schedule a Demo</button>
        </div>
      </section>
      
    </div>
    </>

  );
};

export default AIBotService;