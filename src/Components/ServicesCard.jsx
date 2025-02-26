import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Award, Settings, Cpu, Globe } from 'lucide-react';
import '../assets/css/ServicesCard.css';

const ServicesCard = () => {
  const services = [
    {
      icon: Shield,
      title: "Lite",
      route: "/services/lite",
      iconColor: "#44BCCC",
      description: [
        "Essential Call Screening",
        "Moderate Latency (Standard response time)",
        "Basic Calls Filtering",
        "Voicemail Detection",
        "90% Accuracy",
        "Recorded Call Playback",
        "Inbound and Outbound"
      ]
    },
    {
      icon: Zap,
      title: "Plus",
      route: "/services/plus",
      iconColor: "#44BCCC",
      description: [
        "Advanced Call Handling",
        "Low Latency (Faster response time)",
        "Smart Filtering",
        "Voicemail Detection",
        "94% Accuracy for superior performance",
        "Live Call Monitoring for real-time oversight",
        "Inbound and Outbound",
        "Sentiment Analysis"
      ]
    },
    {
      icon: Globe,
      title: "Ultra",
      route: "/services/ultra",
      iconColor: "#44BCCC",
      description: [
        "Premium Call Intelligence",
        "Low Latency (Faster response time)",
        "Ultimate Filtering with AI-driven accuracy",
        "Voicemail Detection",
        "99% Accuracy for near-perfect classification",
        "Recorded Call Playback",
        "Supports Both Inbound & Outbound Calls"
      ]
    },
    {
      icon: Cpu,
      title: "Custom",
      route: "/services/custom",
      iconColor: "#44BCCC",
      description: [
        "Personalized Features based on your needs",
        "Adjustable Latency to match your workflow",
        "Custom Call Filtering with AI-driven rules",
        "Voicemail Detection with advanced tuning",
        "Up to 99% Accuracy for precise classification",
        "Supports Both Inbound & Outbound Calls"
      ]
    }
  ];

  return (
    <div className="services-section">
      <span className="services-subtitle">OUT BOUND</span>
      <h2 className="services-title">Select the Perfect AI Agent for Your Business</h2>
      
      <div className="services-description" style={{color:"white"}}>
        <p>
          Choose the AI Agent plan that best fits your needs! From <strong>Lite</strong> for basic call screening to <strong>Plus</strong> for advanced handling, <strong>Ultra</strong> for premium AI accuracy, or <strong>Custom</strong> for tailored solutions—optimize your call operations with the right level of intelligence and efficiency.
        </p>
      </div>

      <div className="services-container">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link 
              to={service.route} 
              key={index} 
              className="service-card-link"
            >
              <div className="service-card">
                <Icon 
                  className="service-icon" 
                  color={service.iconColor} 
                  size={48} 
                />
                <h3 className="service-title">{service.title}</h3>
                <div className="service-details">
                  {service.description.map((item, itemIndex) => (
                    <div key={itemIndex} className="detail-item">
                      {item.includes('🎯') ? (
                        <span className="target-item">{item}</span>
                      ) : (
                        <>
                          <span className="check">✓</span>
                          <span>{item}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesCard;