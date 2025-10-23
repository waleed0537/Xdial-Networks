import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/IntegrationForm.css';

const IntegrationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    // Remote Agent Setup
    adminAccess: '',
    sipSeries: '',
    portExtension: '5060',
    
    // Transfer Setup
    setupType: 'same', // 'same' or 'separate'
    
    // Same Dialler fields
    verifierCampaign: '',
    inboundGroup: '',
    userGroup: '',
    
    // Separate Dialler fields
    closerDiallerAccess: '',
    
    // Contact Info
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });

  const whitelistIPs = [
    '5.78.93.62',
    '5.78.158.229',
    '5.78.120.172',
    '5.78.108.42',
    '178.156.174.132'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSubmitMessage({ type: 'info', text: 'IP copied to clipboard!' });
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllIPs = async () => {
    const allIPs = whitelistIPs.join('\n');
    try {
      await navigator.clipboard.writeText(allIPs);
      setSubmitMessage({ type: 'info', text: 'All IPs copied to clipboard!' });
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/integration/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Integration request submitted successfully! We will contact you shortly.' 
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            adminAccess: '',
            sipSeries: '',
            portExtension: '5060',
            setupType: 'same',
            verifierCampaign: '',
            inboundGroup: '',
            userGroup: '',
            closerDiallerAccess: '',
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            additionalNotes: ''
          });
          setSubmitMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: data.message || 'Failed to submit the form. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'An error occurred while submitting the form. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="integration-form-container">
      <div className="integration-form-wrapper">
        {/* Header */}
        <div className="form-header">
          <div>
            <h1 className="form-title">Remote Agent Integration</h1>
            <p className="form-subtitle">Please provide the following information to proceed with the integration</p>
          </div>
        </div>

        {/* Submit Message */}
        {submitMessage.text && (
          <div className={`submit-message ${submitMessage.type}`}>
            {submitMessage.type === 'success' && <i className="bi bi-check-circle-fill"></i>}
            {submitMessage.type === 'error' && <i className="bi bi-exclamation-circle-fill"></i>}
            {submitMessage.type === 'info' && <i className="bi bi-info-circle-fill"></i>}
            <span>{submitMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="integration-form">
          {/* Remote Agent Setup Section */}
          <section className="form-section">
            <div className="section-header">
              <i className="bi bi-gear-fill"></i>
              <h2>Remote Agent Setup</h2>
            </div>
            
            <div className="form-group">
              <label htmlFor="adminAccess">
                Admin Access of Dialler <span className="required">*</span>
              </label>
              <input
                type="text"
                id="adminAccess"
                name="adminAccess"
                value={formData.adminAccess}
                onChange={handleChange}
                placeholder="Enter admin access credentials"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sipSeries">
                SIP Series for Bots <span className="required">*</span>
              </label>
              <input
                type="text"
                id="sipSeries"
                name="sipSeries"
                value={formData.sipSeries}
                onChange={handleChange}
                placeholder="e.g., 8600-8699"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="portExtension">
                Port Extension
              </label>
              <input
                type="text"
                id="portExtension"
                name="portExtension"
                value={formData.portExtension}
                onChange={handleChange}
                placeholder="Default: 5060"
              />
              <small className="form-hint">Leave default if using port 5060</small>
            </div>
          </section>

          {/* Transfer Setup Section */}
          <section className="form-section">
            <div className="section-header">
              <i className="bi bi-arrow-left-right"></i>
              <h2>Bot Campaign Transfer Setup</h2>
            </div>

            <div className="form-group">
              <label>Setup Type <span className="required">*</span></label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="setupType"
                    value="same"
                    checked={formData.setupType === 'same'}
                    onChange={handleChange}
                  />
                  <span>Same Dialler</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="setupType"
                    value="separate"
                    checked={formData.setupType === 'separate'}
                    onChange={handleChange}
                  />
                  <span>Separate Dialler</span>
                </label>
              </div>
            </div>

            {formData.setupType === 'same' ? (
              <>
                <div className="form-group">
                  <label htmlFor="verifierCampaign">
                    Verifier Campaign <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="verifierCampaign"
                    name="verifierCampaign"
                    value={formData.verifierCampaign}
                    onChange={handleChange}
                    placeholder="Enter verifier campaign name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inboundGroup">
                    Inbound Group <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="inboundGroup"
                    name="inboundGroup"
                    value={formData.inboundGroup}
                    onChange={handleChange}
                    placeholder="Enter inbound group"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userGroup">
                    User Group <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="userGroup"
                    name="userGroup"
                    value={formData.userGroup}
                    onChange={handleChange}
                    placeholder="Enter user group"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="closerDiallerAccess">
                  Admin Access of Closer Dialler <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="closerDiallerAccess"
                  name="closerDiallerAccess"
                  value={formData.closerDiallerAccess}
                  onChange={handleChange}
                  placeholder="Enter closer dialler admin access"
                  required
                />
              </div>
            )}
          </section>

          {/* IP Whitelist Section */}
          <section className="form-section ip-section">
            <div className="section-header">
              <i className="bi bi-shield-check"></i>
              <h2>IP Whitelist Information</h2>
            </div>
            
            <p className="ip-instruction">
              Please share the following IPs with your dialer team for whitelisting:
            </p>

            <div className="ip-list">
              {whitelistIPs.map((ip, index) => (
                <div key={index} className="ip-item">
                  <code>{ip}</code>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => copyToClipboard(ip)}
                    title="Copy IP"
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="copy-all-btn"
              onClick={copyAllIPs}
            >
              <i className="bi bi-clipboard-check"></i>
              Copy All IPs
            </button>
          </section>

          {/* Contact Information Section */}
          <section className="form-section">
            <div className="section-header">
              <i className="bi bi-person-fill"></i>
              <h2>Contact Information</h2>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPerson">
                  Contact Person <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any additional information or special requirements..."
                rows="4"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="bi bi-hourglass-split"></i>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle"></i>
                  Submit Integration Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* Submit Message Styles */
        .submit-message {
          max-width: 800px;
          margin: 0 auto 1rem;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          font-weight: 500;
          animation: slideDown 0.3s ease-out;
        }

        .submit-message i {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .submit-message.success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #6ee7b7;
        }

        .submit-message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        .submit-message.info {
          background: #dbeafe;
          color: #1e40af;
          border: 1px solid #93c5fd;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Disabled submit button */
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .submit-btn:disabled:hover {
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.25);
        }
      `}</style>
    </div>
  );
};

export default IntegrationForm;