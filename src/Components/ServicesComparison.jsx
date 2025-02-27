import React from 'react';
import { Check } from 'lucide-react';
import '../assets/css/ServicesComparison.css';

const ServicesComparison = () => {
  // Features that will be compared
  const features = [
    'Quick Deployment',
    'Unified Platform',
    'Privacy Protection',
    'Premium Support',
    'Call Analytics'
  ];

  // Service providers to compare
  const providers = [
    {
      name: 'XDial Networks',
      description: 'Complete VoIP & AI solution',
      price: '$49/mo',
      link: '#',
      features: [true, true, true, true, true]
    },
    {
      name: 'Civic',
      description: 'Generic VoIP provider',
      price: '$65/mo',
      link: '#',
      features: [true, true, false, true, true]
    },
    {
      name: 'Vilid.global',
      description: 'Standard call center solution',
      price: '$59/mo',
      link: '#',
      features: [false, true, true, true, false]
    },
    {
      name: 'Hypr',
      description: 'Basic dialer solution',
      price: '$29/mo',
      link: '#',
      features: [true, false, false, false, true]
    }
  ];

  return (
    <div className="improved-comparison-container">
      <div className="improved-comparison-heading">
        <h2>How We Compare</h2>
        <p>See why leading call centers choose XDial Networks over competitors</p>
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
                  <div className="provider-price">{provider.price}</div>
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
          <tfoot>
            <tr>
              <td></td>
              {providers.map((provider, index) => (
                <td key={index}>
                  <a href={provider.link} className={`table-cta-button ${index === 0 ? 'primary' : 'secondary'}`}>
                    {index === 0 ? 'Get Started' : 'Learn More'}
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ServicesComparison;