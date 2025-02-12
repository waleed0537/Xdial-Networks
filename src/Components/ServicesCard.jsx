import React from 'react';
import '../assets/css/ServicesCard.css';

const ServicesCard = ({ title, description }) => {
  return (
    <div className="service-card">
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <a href="#!" className="service-button">
        Show Details
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </a>
    </div>
  );
};

export default ServicesCard;

// Usage example:
/*
<ServicesCard
  title="Service Title"
  description="Service description goes here with details about the service offering."
/>
*/