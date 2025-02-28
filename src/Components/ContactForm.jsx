import React, { useState } from 'react';
import '../assets/css/contactform.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // API call would go here
      console.log('Form submitted successfully:', formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to submit form. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="minimalist-contact-container">
      <div className="minimalist-contact-content">
        <h1 className="minimalist-contact-title">Contact Us</h1>
        
        {submitSuccess ? (
          <div className="minimalist-success-message">
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out to us. We will get back to you shortly.</p>
            <button
              className="minimalist-button"
              onClick={() => {
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setSubmitSuccess(false);
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="minimalist-contact-form">
            <div className="minimalist-form-row">
              <div className="minimalist-form-group">
                <label className="minimalist-form-label">
                  Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`minimalist-form-input ${errors.name ? 'minimalist-error-input' : ''}`}
                  placeholder=""
                />
                {errors.name && <div className="minimalist-error-message">{errors.name}</div>}
              </div>
              
              <div className="minimalist-form-group">
                <label className="minimalist-form-label">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`minimalist-form-input ${errors.email ? 'minimalist-error-input' : ''}`}
                  placeholder=""
                />
                {errors.email && <div className="minimalist-error-message">{errors.email}</div>}
              </div>
            </div>
            
            <div className="minimalist-form-row">
              <div className="minimalist-form-group">
                <label className="minimalist-form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="minimalist-form-input"
                  placeholder="Optional"
                />
              </div>
              
              <div className="minimalist-form-group">
                <label className="minimalist-form-label">
                  Subject <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`minimalist-form-input ${errors.subject ? 'minimalist-error-input' : ''}`}
                  placeholder=""
                />
                {errors.subject && <div className="minimalist-error-message">{errors.subject}</div>}
              </div>
            </div>
            
            <div className="minimalist-form-group">
              <label className="minimalist-form-label">
                Message <span className="required-star">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`minimalist-form-textarea ${errors.message ? 'minimalist-error-input' : ''}`}
                rows="6"
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <div className="minimalist-error-message">{errors.message}</div>}
            </div>
            
            <div className="minimalist-form-actions">
              {errors.submit && <div className="minimalist-error-message submit-error">{errors.submit}</div>}
              <button
                type="submit"
                className="minimalist-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;