import React from 'react';
import { Check } from 'lucide-react';
import '../assets/css/ServicesComparison.css';

const ServicesComparison = () => {
  // Features that will be compared - prioritizing the most important differentiators
  // Common features at top, differentiating features below
  const features = [
    'Inbound & Outbound Support',
    'Voicemail Detection',
    'Call Screening Capability',
    'Low Latency Response',
    'Live Call Monitoring',
    'Sentiment Analysis',
    'AI-driven Custom Rules'
  ];

  // Service tiers mapped from ServicesCard data with simplified feature matrix
  const providers = [
    {
      name: 'xLite',
      description: 'Essential Call Screening',
      link: '/services/lite',
      features: [true, true, true, false, false, false, false]
    },
    {
      name: 'xPlus',
      description: 'Advanced Call Handling',
      link: '/services/plus',
      features: [true, true, true, true, true, true, false]
    },
    {
      name: 'xUltra',
      description: 'Premium Call Intelligence',
      link: '/services/ultra',
      features: [true, true, true, true, false, false, false]
    },
    {
      name: 'xCustom',
      description: 'Personalized Solution',
      link: '/services/custom',
      features: [true, true, true, true, false, false, true]
    }
  ];

  return (
    <div className="improved-comparison-container">
      <div className="improved-comparison-heading">
        <h2>AI Agent Feature Comparison</h2>
        <p>Compare our AI agent tiers to find the perfect solution for your business needs</p>
      </div>
      
      <div className="improved-comparison-table-wrapper">
        <table className="improved-comparison-table">
          <thead>
            <tr>
              <th className="feature-header">Features</th>
              {providers.map((provider, index) => (
                <th key={index} className="provider-header">
                  <div className="provider-name">{provider.name}</div>
                  <div className="provider-description">{provider.description}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, featureIndex) => (
              <tr key={featureIndex}>
                <td className="feature-name">{feature}</td>
                {providers.map((provider, providerIndex) => (
                  <td key={providerIndex} className="feature-cell">
                    {provider.features[featureIndex] ? (
                      <div className="feature-available">
                        <Check size={18} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="feature-unavailable">
                        <span>—</span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesComparison;