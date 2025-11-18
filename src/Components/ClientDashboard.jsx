import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ClientDashboard.css';

// Environment detection
const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5010';
  }
  return 'https://xdialnetworks.com';
};

const API_URL = getApiUrl();

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isClientAuthenticated');
    const clientId = localStorage.getItem('clientId');
    
    if (!isAuthenticated || !clientId) {
      navigate('/admin/login');
    } else {
      fetchClientData(clientId);
    }
  }, [navigate]);

  const fetchClientData = async (clientId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/client/${clientId}/campaigns`);
      const data = await response.json();

      if (data.success) {
        setClientData(data.client);
        setCampaigns(data.campaigns);
      } else {
        setError('Failed to fetch campaign data');
      }
    } catch (err) {
      console.error('Error fetching client data:', err);
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
  
    navigate('/client-management');
  };

  const viewCampaignDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCampaign(null);
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'pending': 'status-pending',
      'in-progress': 'status-in-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  };

  const getStatusLabel = (status) => {
    const labelMap = {
      'pending': 'Pending',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return labelMap[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your campaigns...</p>
      </div>
    );
  }

  return (
    <div className="client-dashboard">
      {/* Header */}
      <header className="client-header">
        <div className="header-content">
          <div className="header-left">
            <div className="brand">
              <i className="bi bi-telephone-fill"></i>
              <h1>XDialNetworks</h1>
            </div>
            <div className="client-info">
              <span className="client-badge">
                <i className="bi bi-person-badge"></i>
                Client ID: {localStorage.getItem('clientId')}
              </span>
              {clientData && (
                <span className="company-name">{clientData.companyName}</span>
              )}
            </div>
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Onboarding
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="client-content">
        <div className="content-wrapper">
          {/* Page Title */}
          <div className="page-header">
            <div>
              <h2>My Campaigns</h2>
              <p>View and manage your remote agent campaigns</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-banner">
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          {/* Campaigns Grid */}
          {campaigns.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-inbox"></i>
              <h3>No Campaigns Yet</h3>
              <p>You don't have any active campaigns at the moment.</p>
            </div>
          ) : (
            <div className="campaigns-grid">
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="campaign-card"
                  onClick={() => viewCampaignDetails(campaign)}
                >
                  <div className="campaign-header">
                    <div className="campaign-icon">
                      <i className="bi bi-robot"></i>
                    </div>
                    <span className={`status-badge ${getStatusBadgeClass(campaign.status)}`}>
                      {getStatusLabel(campaign.status)}
                    </span>
                  </div>
                  
                  <div className="campaign-body">
                    <h3>{campaign.campaign} - {campaign.model}</h3>
                    <div className="campaign-details">
                      <div className="detail-row">
                        <i className="bi bi-people-fill"></i>
                        <span>{campaign.numberOfBots+1} Remote Agents</span>
                      </div>
                      <div className="detail-row">
                        <i className="bi bi-calendar3"></i>
                        <span>Submitted: {formatDate(campaign.submittedAt)}</span>
                      </div>
                      {campaign.extensions && campaign.extensions.length > 0 && (
                        <div className="detail-row">
                          <i className="bi bi-telephone"></i>
                          <span>{campaign.extensions.length} Extension(s)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="campaign-footer">
                    <button className="view-details-btn">
                      <i className="bi bi-eye"></i>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Campaign Details Modal */}
      {showModal && selectedCampaign && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Campaign Details</h2>
              <button className="close-modal-btn" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">
              {/* Status */}
              <div className="detail-section">
                <h3><i className="bi bi-flag-fill"></i> Status</h3>
                <span className={`status-badge large ${getStatusBadgeClass(selectedCampaign.status)}`}>
                  {getStatusLabel(selectedCampaign.status)}
                </span>
              </div>

              {/* Campaign Configuration */}
              <div className="detail-section">
                <h3><i className="bi bi-gear-fill"></i> Campaign Configuration</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Campaign Type</label>
                    <p>{selectedCampaign.campaign}</p>
                  </div>
                  <div className="detail-item">
                    <label>Bot Model</label>
                    <p>{selectedCampaign.model}</p>
                  </div>
                  <div className="detail-item">
                    <label>Number of Remote Agents</label>
                    <p>{selectedCampaign.numberOfBots}</p>
                  </div>
                  <div className="detail-item">
                    <label>Transfer Settings</label>
                    <p>{selectedCampaign.transferSettings}</p>
                  </div>
                </div>
              </div>

              {/* Extensions */}
              {selectedCampaign.extensions && selectedCampaign.extensions.length > 0 && (
                <div className="detail-section">
                  <h3><i className="bi bi-telephone-fill"></i> Extensions</h3>
                  <div className="badges-container">
                    {selectedCampaign.extensions.map((ext, idx) => (
                      <span key={idx} className="info-badge">{ext}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Server IPs */}
              {selectedCampaign.serverIPs && selectedCampaign.serverIPs.length > 0 && (
                <div className="detail-section">
                  <h3><i className="bi bi-hdd-network-fill"></i> Server IPs</h3>
                  <div className="badges-container">
                    {selectedCampaign.serverIPs.map((ip, idx) => (
                      <span key={idx} className="info-badge">{ip}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Campaign Resources (if completed) */}
              {selectedCampaign.status === 'completed' && selectedCampaign.campaignResources && (
                <div className="detail-section resources-section">
                  <h3><i className="bi bi-file-earmark-text-fill"></i> Campaign Resources</h3>
                  <div className="resources-list">
                    {selectedCampaign.campaignResources.longScript && (
                      <a 
                        href={selectedCampaign.campaignResources.longScript} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <i className="bi bi-file-text"></i>
                        <span>Long Script</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    )}
                    {selectedCampaign.campaignResources.clientDashboard && (
                      <a 
                        href={selectedCampaign.campaignResources.clientDashboard} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <i className="bi bi-speedometer2"></i>
                        <span>Client Dashboard</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    )}
                    {selectedCampaign.campaignResources.disposition && (
                      <a 
                        href={selectedCampaign.campaignResources.disposition} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <i className="bi bi-list-check"></i>
                        <span>Disposition</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="detail-section">
                <h3><i className="bi bi-clock-fill"></i> Timeline</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Submitted</label>
                    <p>{formatDate(selectedCampaign.submittedAt)}</p>
                  </div>
                  <div className="detail-item">
                    <label>Last Updated</label>
                    <p>{formatDate(selectedCampaign.updatedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedCampaign.customRequirements && (
                <div className="detail-section">
                  <h3><i className="bi bi-chat-square-text-fill"></i> Additional Notes</h3>
                  <div className="notes-box">
                    <p>{selectedCampaign.customRequirements}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;