import React from 'react';
import '../assets/css/ServicesComparison.css'
const ServicesComparison = () => {
  const CheckIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      style={{ width: '12px', height: '12px' }}
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );

  const headers = [
    'FUTURES',
    'IDV',
    'APPS',
    'CONFIDENTIALITY',
    'WITHOUT GADGET'
  ];

  const rows = [
    'coindox',
    'Civic',
    'Vilid.global',
    'Hypr'
  ];

  return (
    <div className="services-comparison-container">
      <table className="services-comparison-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((name) => (
            <tr key={name}>
              <td>{name}</td>
              {[...Array(4)].map((_, index) => (
                <td key={index} className="feature-cell">
                  <span className="feature-icon feature-available">
                    <CheckIcon />
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesComparison;