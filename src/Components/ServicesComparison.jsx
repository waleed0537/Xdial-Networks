import React from 'react';
import { Check } from 'lucide-react';
import '../assets/css/ServicesComparison.css';

const ServicesComparison = () => {
  // Features that will be compared
  const features = [
    'AI Call Screening',
    'Voicemail Detection',
    'Real-Time Monitoring',
    'Sentiment Analysis',
    'Scalable Solution',
    'Adaptive Learning'
  ];

  // Service tiers to compare
  const providers = [
    {
      name: 'Lite AI Agent',
      description: 'Essential call handling solution',
      link: '#lite',
      features: [true, true, false, false, false, false, true, false]
    },
    {
      name: 'Plus AI Agent',
      description: 'Advanced call operations',

      link: '#plus',
      features: [true, true, true, true, true, true, true, false]
    },
    {
      name: 'Ultra AI Agent',
      description: 'Enterprise-grade AI solution',
      
      link: '#ultra',
      features: [true, true, true, true, true, true, true, true]
    },
    {
      name: 'Custom Plan',
      description: 'Tailored business solution',

      link: '#custom',
      features: [true, true, true, true, true, true, true, true]
    }
  ];

  return (
    <div className="improved-comparison-container">
      <div className="improved-comparison-heading">
        <h2>Our Service Tiers</h2>
        <p>Choose the perfect AI call handling solution for your business needs</p>
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
                    {index === 3 ? 'Contact Sales' : 'Get Started'}
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