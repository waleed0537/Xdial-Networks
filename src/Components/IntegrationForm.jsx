import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/IntegrationForm.css';

// Environment detection
const getApiUrl = () => {
  // Check if running locally
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5010';
  }
  // Production
  return 'https://xdialnetworks.com';
};

const API_URL = getApiUrl();

const IntegrationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  // Campaign configuration
  const campaignConfig = {
    'Medicare': ['Advanced', 'Basic'],
    'Auto Insurance': ['Advanced', 'Basic'],
    'MVA': ['Basic'],
    'ACA': ['Basic'],
    'Final Expense': ['Advanced', 'Basic'],
    'Home': ['Basic'],
    'Auto Warranty': ['Advanced'],
    'Medalert': ['Advanced']
  };

  const [formData, setFormData] = useState({
    // Campaign Configuration
    campaign: '',
    model: '', // This will be auto-set based on campaign
    numberOfBots: '',
    transferSettings: 'balanced', // Set default to balanced

    // Integration Settings - Primary Dialler
    setupType: 'same',
    primaryIpValidation: '',
    primaryAdminLink: '',
    primaryUser: '',
    primaryPassword: '',
    primaryBotsCampaign: '',
    primaryUserSeries: '',
    primaryPort: '5060',

    // Separate Closer Dialler (if applicable)
    closerIpValidation: '',
    closerAdminLink: '',
    closerUser: '',
    closerPassword: '',
    closerCampaign: '',
    closerIngroup: '',
    closerPort: '5060',

    // Contact Info
    companyName: '',

    // Custom Requirements
    customRequirements: ''
  });

  const whitelistIPs = [
    '5.78.93.62',
    '5.78.158.229',
    '5.78.120.172',
    '5.78.108.42',
    '178.156.174.132'
  ];

  // Auto-set model and reset transferSettings when campaign changes
  // Auto-set model when campaign changes
useEffect(() => {
  if (formData.campaign) {
    const availableModels = campaignConfig[formData.campaign];
    let selectedModel = '';
    
    if (availableModels && availableModels.includes('Basic')) {
      selectedModel = 'Basic';
    } else if (availableModels && availableModels.includes('Advanced')) {
      selectedModel = 'Advanced';
    }
    
    setFormData(prev => ({ 
      ...prev, 
      model: selectedModel,
      transferSettings: 'balanced' 
    }));
  }
}, [formData.campaign]);

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
      const response = await fetch(`${API_URL}/api/integration/submit`, {
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
            campaign: '',
            model: '',
            numberOfBots: '',
            transferSettings: 'balanced',
            setupType: 'same',
            primaryIpValidation: '',
            primaryAdminLink: '',
            primaryUser: '',
            primaryPassword: '',
            primaryBotsCampaign: '',
            primaryUserSeries: '',
            primaryPort: '5060',
            closerIpValidation: '',
            closerAdminLink: '',
            closerUser: '',
            closerPassword: '',
            closerCampaign: '',
            closerIngroup: '',
            closerPort: '5060',
            companyName: '',
            customRequirements: ''
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

  // Get the model info for display
  const getModelInfo = () => {
    if (!formData.campaign) return null;
    const availableModels = campaignConfig[formData.campaign];
    return {
      hasBasic: availableModels.includes('Basic'),
      hasAdvanced: availableModels.includes('Advanced'),
      selectedModel: formData.model
    };
  };

  const modelInfo = getModelInfo();

  return (
    <div className="integration-form-container">
      <div className="integration-form-wrapper">
        {/* Header */}
        <div className="form-header">
          <div>
            <h1 className="form-title">Remote Agent Integration Request</h1>
            <p className="form-subtitle">Configure your Remote Agent campaign and integration settings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="integration-form">
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
            </div>
          </section>

          {/* Campaign Configuration Section */}
          <section className="form-section">
            <div className="section-header">
              <i className="bi bi-robot"></i>
              <h2>Campaign Configuration</h2>
            </div>

            <div className="form-group">
              <label htmlFor="campaign">
                Campaign Type <span className="required">*</span>
              </label>
              <select
                id="campaign"
                name="campaign"
                value={formData.campaign}
                onChange={handleChange}
                required
              >
                <option value="">Select Campaign</option>
                {Object.keys(campaignConfig).map(campaign => (
                  <option key={campaign} value={campaign}>{campaign}</option>
                ))}
              </select>
            </div>

            {/* Model Information Display */}
            {modelInfo && formData.campaign && (
              <div style={{ 
                marginBottom: '20px', 
                padding: '16px', 
                backgroundColor: modelInfo.hasBasic && modelInfo.hasAdvanced ? '#dbeafe' : '#fef3c7',
                borderLeft: modelInfo.hasBasic && modelInfo.hasAdvanced ? '4px solid #3b82f6' : '4px solid #f59e0b',
                borderRadius: '6px'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', fontWeight: '500' }}>
                  <i className="bi bi-info-circle-fill" style={{ marginRight: '8px' }}></i>
                  {modelInfo.hasBasic && modelInfo.hasAdvanced ? (
                    <span><strong>Both Models Available:</strong> This campaign supports both Basic and Advanced models. Your selection will be determined by the transfer quality settings below.</span>
                  ) : modelInfo.hasBasic ? (
                    <span><strong>Basic Model Selected:</strong> This campaign only supports the Basic model with all transfer quality settings.</span>
                  ) : (
                    <span><strong>Advanced Model Selected:</strong> This campaign only supports the Advanced model.</span>
                  )}
                </p>
              </div>
            )}

            {formData.campaign && (
              <div className="form-group">
                <label>
                  Transfer Quality Settings <span className="required">*</span>
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={
                      formData.transferSettings === 'quality' ? 0 :
                        formData.transferSettings === 'balanced' ? 1 :
                          formData.transferSettings === 'high-volume' ? 2 : 3
                    }
                    onChange={(e) => {
                      const values = ['quality', 'balanced', 'high-volume', 'max-volume'];
                      setFormData(prev => ({
                        ...prev,
                        transferSettings: values[e.target.value]
                      }));
                    }}
                    className="quality-slider"
                    required
                  />
                  <div className="slider-labels">
                    <span className={formData.transferSettings === 'quality' ? 'active' : ''}>Quality</span>
                    <span className={formData.transferSettings === 'balanced' ? 'active' : ''}>Balanced</span>
                    <span className={formData.transferSettings === 'high-volume' ? 'active' : ''}>High Volume</span>
                    <span className={formData.transferSettings === 'max-volume' ? 'active' : ''}>Max Volume</span>
                  </div>
                </div>

                {formData.transferSettings && (
                  <div className="transfer-info-box">
                    {formData.transferSettings === 'quality' && (
                      <>
                        <div className="info-header">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                            <div className="model-tag" style={{ alignSelf: 'flex-start' }}>Basic Model</div>
                            <span className="badge" style={{ alignSelf: 'center', marginTop: '12px', background: 'transparent', color: '#374151', border: 'none' }}>Quality</span>
                          </div>
                        </div>
                        <p style={{ marginTop: '-30px' }}>This setting focuses on prioritizing higher-quality transfers by connecting only the most relevant and well-qualified calls. It's more selective, so the overall number of transfers is typically lower, with a stronger emphasis on quality.</p>
                        <div className="metrics-grid">
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle quality" strokeDasharray="90, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">90</div>
                            </div>
                            <span className="metric-label">Quality</span>
                          </div>
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle volume" strokeDasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">40</div>
                            </div>
                            <span className="metric-label">Volume</span>
                          </div>
                        </div>
                      </>
                    )}
                    {formData.transferSettings === 'balanced' && (
                      <>
                        <div className="info-header">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                            <div className="model-tag" style={{ alignSelf: 'flex-start' }}>Basic Model</div>
                            <span className="badge" style={{ alignSelf: 'center', marginTop: '12px', background: 'transparent', color: '#374151', border: 'none' }}>Balanced (Recommended)</span>
                          </div>
                        </div>
                        <p style={{ marginTop: '-30px' }}>This setting offers an even mix of quality and volume, helping maintain a steady flow of transfers without missing potential opportunities. You can expect a healthy balance between well-qualified, mixed, and general calls.</p>
                        <div className="metrics-grid">
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle quality" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">50</div>
                            </div>
                            <span className="metric-label">Quality</span>
                          </div>
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle volume" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">50</div>
                            </div>
                            <span className="metric-label">Volume</span>
                          </div>
                        </div>
                      </>
                    )}
                    {formData.transferSettings === 'high-volume' && (
                      <>
                        <div className="info-header">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                            <div className="model-tag" style={{ alignSelf: 'flex-start' }}>Basic Model</div>
                            <span className="badge" style={{ alignSelf: 'center', marginTop: '12px', background: 'transparent', color: '#374151', border: 'none' }}>High Volume</span>
                          </div>
                        </div>
                        <p style={{ marginTop: '-30px' }}>This setting prioritizes higher transfer volume, delivering a medium to high number of transfers. While the overall volume is higher, the mix of call quality may vary, including well-qualified, mixed, and general calls, providing more opportunities at scale.</p>
                        <div className="metrics-grid">
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle quality" strokeDasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">40</div>
                            </div>
                            <span className="metric-label">Quality</span>
                          </div>
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle volume" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">80</div>
                            </div>
                            <span className="metric-label">Volume</span>
                          </div>
                        </div>
                      </>
                    )}
                    {formData.transferSettings === 'max-volume' && (
                      <>
                        <div className="info-header">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                            <div className="model-tag" style={{ alignSelf: 'flex-start' }}>Basic Model</div>
                            <span className="badge" style={{ alignSelf: 'center', marginTop: '12px', background: 'transparent', color: '#374151', border: 'none' }}>Max Volume</span>
                          </div>
                        </div>
                        <p style={{ marginTop: '-30px' }}>This setting focuses on achieving the max number of transfers possible. While it maximizes volume, it also leads to wasted resources and time due to the higher number of low-quality connections.</p>
                        <div className="metrics-grid">
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle quality" strokeDasharray="30, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">30</div>
                            </div>
                            <span className="metric-label">Quality</span>
                          </div>
                          <div className="metric-card">
                            <div className="metric-circle">
                              <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle volume" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="metric-number">100</div>
                            </div>
                            <span className="metric-label">Volume</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="numberOfBots">
                Number of Remote Agents <span className="required">*</span>
              </label>
              <input
                type="number"
                id="numberOfBots"
                name="numberOfBots"
                value={formData.numberOfBots}
                onChange={handleChange}
                placeholder="e.g., 10"
                min="1"
                max="1000"
                required
              />
              <small className="form-hint">Specify how many concurrent remote agents you need (1-1000)</small>
            </div>
          </section>

          {/* Integration Settings Section */}
          <section className="form-section">
            <div className="section-header">
              <i className="bi bi-hdd-network"></i>
              <h2>Integration Settings</h2>
            </div>

            <div className="form-group">
              <label>Dialler Configuration <span className="required">*</span></label>
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
                  <span>Separate Closer Dialler</span>
                </label>
              </div>
            </div>

            <div className="integration-subsection">
              <h3 className="subsection-title">
                <i className="bi bi-gear-wide-connected"></i>
                Primary Dialler Settings
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="primaryIpValidation">
                    IP Validation Link <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="primaryIpValidation"
                    name="primaryIpValidation"
                    value={formData.primaryIpValidation}
                    onChange={handleChange}
                    placeholder="e.g., example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="primaryAdminLink">
                    Admin Link <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="primaryAdminLink"
                    name="primaryAdminLink"
                    value={formData.primaryAdminLink}
                    onChange={handleChange}
                    placeholder="e.g., your-dialer.com, www.your-dialer.com, or https://your-dialer.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="primaryUser">
                    Username <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="primaryUser"
                    name="primaryUser"
                    value={formData.primaryUser}
                    onChange={handleChange}
                    placeholder="Admin username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="primaryPassword">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="primaryPassword"
                    name="primaryPassword"
                    value={formData.primaryPassword}
                    onChange={handleChange}
                    placeholder="Admin password"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="primaryBotsCampaign">
                    Fronting Campaign
                  </label>
                  <input
                    type="text"
                    id="primaryBotsCampaign"
                    name="primaryBotsCampaign"
                    value={formData.primaryBotsCampaign}
                    onChange={handleChange}
                    placeholder="Enter fronting campaign name (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="primaryUserSeries">
                    Verifier Campaign
                  </label>
                  <input
                    type="text"
                    id="primaryUserSeries"
                    name="primaryUserSeries"
                    value={formData.primaryUserSeries}
                    onChange={handleChange}
                    placeholder="Enter verifier campaign name (optional)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="primaryPort">
                  Port
                </label>
                <input
                  type="text"
                  id="primaryPort"
                  name="primaryPort"
                  value={formData.primaryPort}
                  onChange={handleChange}
                  placeholder="e.g., 7788"
                />
              </div>
            </div>

            {/* Separate Closer Dialler Settings */}
            {formData.setupType === 'separate' && (
              <div className="integration-subsection closer-section">
                <h3 className="subsection-title">
                  <i className="bi bi-diagram-3"></i>
                  Closer Dialler Settings
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="closerIpValidation">
                      IP Validation Link <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="closerIpValidation"
                      name="closerIpValidation"
                      value={formData.closerIpValidation}
                      onChange={handleChange}
                      placeholder="e.g., example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="closerAdminLink">
                      Admin Link <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="closerAdminLink"
                      name="closerAdminLink"
                      value={formData.closerAdminLink}
                      onChange={handleChange}
                      placeholder="e.g., closer-dialer.com, www.closer-dialer.com, or https://closer-dialer.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="closerUser">
                      Username <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="closerUser"
                      name="closerUser"
                      value={formData.closerUser}
                      onChange={handleChange}
                      placeholder="Admin username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="closerPassword">
                      Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      id="closerPassword"
                      name="closerPassword"
                      value={formData.closerPassword}
                      onChange={handleChange}
                      placeholder="Admin password"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="closerCampaign">
                      Campaign <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="closerCampaign"
                      name="closerCampaign"
                      value={formData.closerCampaign}
                      onChange={handleChange}
                      placeholder="Closer campaign name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="closerIngroup">
                      Ingroup <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="closerIngroup"
                      name="closerIngroup"
                      value={formData.closerIngroup}
                      onChange={handleChange}
                      placeholder="Inbound group name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="closerPort">
                    Port
                  </label>
                  <input
                    type="text"
                    id="closerPort"
                    name="closerPort"
                    value={formData.closerPort}
                    onChange={handleChange}
                    placeholder="e.g., 7788"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Custom Requirements Section */}
          <section className="form-section">
            <div className="section-header">
              <i className="bi bi-chat-square-text"></i>
              <h2>Current Remote Agents</h2>
            </div>

            <div className="form-group">
              <label htmlFor="customRequirements">
                What company's remote agents are you currently using? (Optional)
              </label>
              <textarea
                id="customRequirements"
                name="customRequirements"
                value={formData.customRequirements}
                onChange={handleChange}
                rows="6"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="bi bi-hourglass-split"></i>
                  Submitting Request...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill"></i>
                  Submit Integration Request
                </>
              )}
            </button>
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
        </form>
      </div>
    </div>
  );
};

export default IntegrationForm;