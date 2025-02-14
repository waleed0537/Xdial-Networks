import React from 'react';
import { Shield, Zap, Award, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ServicesCard.css';

const ServicesCard = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Shield,
      title: "Lite",
      path: "/services/lite",
      description: [
        "Essential Call Screening",
        "Moderate Latency (Standard response time)",
        "Basic Calls Filtering",
        "Voicemail Detection",
        "90% Accuracy",
        "Recorded Call Playback",
        "🎯 Best for Outbound Call Centers"
      ]
    },
    {
      icon: Zap,
      title: "Plus",
      path: "/services/plus",
      description: [
        "Advanced Call Handling",
        "Low Latency (Faster response time)",
        "Smart Filtering",
        "Voicemail Detection",
        "94% Accuracy for superior performance",
        "Live Call Monitoring for real-time oversight",
        "🎯 Best for Outbound Call Operations"
      ]
    },
    {
      icon: Award,
      title: "Ultra",
      path: "/services/ultra",
      description: [
        "Premium Call Intelligence",
        "Low Latency (Faster response time)",
        "Ultimate Filtering with AI-driven accuracy",
        "Voicemail Detection",
        "99% Accuracy for near-perfect classification",
        "Recorded Call Playback",
        "Supports Both Inbound & Outbound Calls",
        "🎯 Best for Enterprise Solutions"
      ]
    },
    {
      icon: Settings,
      title: "Custom",
      path: "/services/custom",
      description: [
        "Personalized Features based on your needs",
        "Adjustable Latency to match your workflow",
        "Custom Call Filtering with AI-driven rules",
        "Voicemail Detection with advanced tuning",
        "Up to 99% Accuracy for precise classification",
        "Supports Both Inbound & Outbound Calls",
        "🎯 Tailored for Your Unique Needs"
      ]
    }
  ];

  return (
    <div className="services-section">
      <span className="subtitle">OUR SERVICES</span>
      <h2 className="section-title">What We Offer</h2>
      <div className="services-container">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index} 
              className="service-card"
              onClick={() => navigate(service.path)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  navigate(service.path);
                }
              }}
            >
              <Icon className="service-icon" />
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
          );
        })}
      </div>
    </div>
  );
};

export default ServicesCard;