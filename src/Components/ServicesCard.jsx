import React from 'react';
import { Shield, Zap, Award, Settings } from 'lucide-react';
import '../assets/css/ServicesCard.css';

const ServicesCard = () => {
  const services = [
    {
      icon: Shield,
      title: "Lite",
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
    <div className="services-container">
      <style>
        {`
          .icon-wrapper {
            margin-bottom: 1.5rem;
          }
          
          .feature-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .feature-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }
          
          .feature-check {
            display: inline-block;
            min-width: 20px;
          }
        `}
      </style>

      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <div key={index} className="service-card">
            <div className="icon-wrapper">
              <Icon size={40} color="#45ACAB" />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <div className="service-description">
              <ul className="feature-list">
                {service.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="feature-item">
                    {item.includes('🎯') ? (
                      <span>{item}</span>
                    ) : (
                      <>
                        <span className="feature-check">✅</span>
                        <span>{item}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesCard;  