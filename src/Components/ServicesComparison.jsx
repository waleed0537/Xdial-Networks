import React from 'react';
import '../assets/css/ServicesComparison.css';

const ServicesComparison = () => {
  // Updated features with more specific text
  const features = [
    'Call Direction Support',
    'Response Time',
    'Call Screening',
    'Latency',
    'Live Call Monitoring',
    'Sentiment Analysis',
    'Adaptive Learning'
  ];

  // Updated providers with text values instead of booleans
  const providers = [
    {
      name: 'xLite',
      description: 'Essential Call Screening',
      link: '/services/lite',
      features: [
        'Inbound & Outbound', 
        '3s', 
        'Basic', 
        'Moderate',
        'N/A',
        'N/A',
        'N/A'
      ]
    },
    {
      name: 'xPlus',
      description: 'Advanced Call Handling',
      link: '/services/plus',
      features: [
        'Outbound', 
        '5s', 
        'Advanced', 
        'Superfast',
        'Yes',
        'Yes',
        'N/A'
      ]
    },
    {
      name: 'xUltra',
      description: 'Premium Call Intelligence',
      link: '/services/ultra',
      features: [
        'Inbound & Outbound', 
        '3s', 
        'Premium', 
        'Faster',
        'N/A',
        'Yes',
        'Yes'
      ]
    },
    {
      name: 'xCustom',
      description: 'Personalized Solution',
      link: '/services/custom',
      features: [
        'Custom', 
        'Custom', 
        'Custom', 
        'Custom',
        'Custom',
        'Custom',
        'Custom'
      ]
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
                  <td key={providerIndex} className={`feature-cell ${provider.features[featureIndex] === 'Custom' ? 'custom-feature' : ''}`}>
                    <div className={`feature-value ${
                      provider.features[featureIndex] === 'Yes' ? 'feature-yes' : 
                      provider.features[featureIndex] === 'N/A' ? 'feature-na' : 
                      provider.features[featureIndex] === 'Custom' ? 'feature-custom no-underline' : 'feature-text'
                    }`}>
                      {provider.features[featureIndex]}
                    </div>
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