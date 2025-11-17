import { useState, useEffect, useMemo } from 'react';
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
// Add pulse animation style
const pulseStyle = document.createElement('style');
pulseStyle.innerHTML = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`;
if (!document.head.querySelector('style[data-pulse-animation]')) {
  pulseStyle.setAttribute('data-pulse-animation', 'true');
  document.head.appendChild(pulseStyle);
}
const Onboarding = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // each item is an integration/campaign
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  useEffect(() => {
    const isClient = localStorage.getItem('isClientAuthenticated');
    const isAdmin = localStorage.getItem('isAdminAuthenticated');

    if (!isClient && !isAdmin) {
      navigate('/admin/login');
    } else {
      fetchIntegrations();
    }
  }, [navigate]);

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true);
      // fetch a large page and filter client-side to allow flexible filters
      const response = await fetch(`${API_URL}/api/integration/all?limit=1000`);
      const data = await response.json();

      if (data.success) {
        setItems(data.data || []);
      } else {
        setError('Failed to fetch integrations');
      }
    } catch (err) {
      console.error('Error fetching integrations:', err);
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const uniqueCampaigns = useMemo(() => {
    const s = new Set();
    items.forEach(i => i.campaign && s.add(i.campaign));
    return Array.from(s);
  }, [items]);

  const uniqueModels = useMemo(() => {
    const s = new Set();
    items.forEach(i => i.model && s.add(i.model));
    return Array.from(s);
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter(i => {
      // Only show completed campaigns
      if (i.status !== 'completed') return false;
      if (campaignFilter && i.campaign !== campaignFilter) return false;
      if (modelFilter && i.model !== modelFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const company = (i.companyName || '').toLowerCase();
        const campaign = (i.campaign || '').toLowerCase();
        const model = (i.model || '').toLowerCase();
        const clientId = (i.clientsdata_id || '').toString().toLowerCase();

        if (!company.includes(q) && !campaign.includes(q) && !model.includes(q) && !clientId.includes(q)) return false;
      }
      return true;
    });
  }, [items, search, campaignFilter, modelFilter]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate expiration status
  const getExpirationStatus = (endDate) => {
    if (!endDate) return { status: 'no-date', daysLeft: null, text: 'Not Set', className: '' };

    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        status: 'expired',
        daysLeft: diffDays,
        text: `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`,
        className: 'status-expired'
      };
    } else if (diffDays === 0) {
      return {
        status: 'expires-today',
        daysLeft: 0,
        text: 'Expires Today',
        className: 'status-expires-today'
      };
    } else if (diffDays <= 3) {
      return {
        status: 'expires-soon',
        daysLeft: diffDays,
        text: `${diffDays} day${diffDays !== 1 ? 's' : ''} left`,
        className: 'status-expires-soon'
      };
    } else {
      return {
        status: 'active',
        daysLeft: diffDays,
        text: `${diffDays} days left`,
        className: 'status-active'
      };
    }
  };

  const handleToggleAccess = async (id, currentValue) => {
    const newValue = !currentValue;
    try {
      const res = await fetch(`${API_URL}/api/integration/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientAccessEnabled: newValue })
      });
      const data = await res.json();

      if (data.success) {
        // Update state with the server response to ensure consistency
        setItems(prev => prev.map(it => it.id === id ? data.data : it));
      } else {
        console.error('Failed to update access:', data.message || data);
        // Fetch fresh data to ensure UI matches server state
        fetchIntegrations();
      }
    } catch (err) {
      console.error('Error updating access:', err);
      // Fetch fresh data to ensure UI matches server state
      fetchIntegrations();
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPrimaryPassword, setShowPrimaryPassword] = useState(false);
  const [showCloserPassword, setShowCloserPassword] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setShowPrimaryPassword(false);
    setShowCloserPassword(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    navigate('/client-onboarding');
  };

  // Count campaigns by expiration status for notifications
  const expirationCounts = useMemo(() => {
    const counts = {
      expired: 0,
      expiresToday: 0,
      expiresSoon: 0
    };
    filtered.forEach(item => {
      const status = getExpirationStatus(item.endDate);
      if (status.status === 'expired') counts.expired++;
      else if (status.status === 'expires-today') counts.expiresToday++;
      else if (status.status === 'expires-soon') counts.expiresSoon++;
    });
    return counts;
  }, [filtered]);

  if (isLoading) {
    return (
      <div className="client-dashboard">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="client-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>XDial Networks</h1>
            <p>Client Management</p>
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Client Onboarding
            </button>
          </div>
        </div>
      </header>

      <div className="client-content">
        <div className="content-wrapper">
          <div className="page-header">
            <div>
              <h2>Manage Clients</h2>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="filters-row" style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
            <input
              type="search"
              placeholder="Search company, campaign, model or client id"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />

            <select value={campaignFilter} onChange={e => setCampaignFilter(e.target.value)}>
              <option value="">All Campaigns</option>
              {uniqueCampaigns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={modelFilter} onChange={e => setModelFilter(e.target.value)}>
              <option value="">All Models</option>
              {uniqueModels.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* List header */}
          <div className="list-table" style={{ width: '100%' }}>
            <div className="list-row header">
              <strong>Company</strong>
              <strong>Campaign</strong>
              <strong>Model</strong>
              <strong>Extensions</strong>
              <strong>Server IPs</strong>
              <strong>Status</strong>
              <strong>Expiration</strong>
            </div>

            {filtered.map(item => {
              const expirationStatus = getExpirationStatus(item.endDate);
              return (
                <div key={item.id} className="list-row" onClick={() => openModal(item)} style={{ alignItems: 'center', minHeight: '50px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                    <span style={{ fontWeight: 600 }}>{item.companyName || '—'}</span>
                    {item.testing && (
                      <i className="bi bi-gear-fill" style={{
                        color: '#ff9800',
                        fontSize: '14px',
                        marginLeft: '4px'
                      }} title="Testing Phase"></i>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                    <span>{item.campaign || '—'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                    <span>{item.model || '—'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="bi bi-telephone-fill"></i>
                    <span>{(item.extensions && item.extensions.length > 0) ? item.extensions.join(', ') : '—'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="bi bi-hdd-network-fill"></i>
                    <span>{(item.serverIPs && item.serverIPs.length > 0) ? item.serverIPs.join(', ') : '—'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label className="switch" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={!!item.clientAccessEnabled} onChange={() => handleToggleAccess(item.id, !!item.clientAccessEnabled)} />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '5px',
                      whiteSpace: 'nowrap',
                      backgroundColor:
                        expirationStatus.status === 'expired' ? '#fee2e2' :
                          expirationStatus.status === 'expires-today' ? '#fef3c7' :
                            expirationStatus.status === 'expires-soon' ? '#fff7ed' :
                              expirationStatus.status === 'no-date' ? '#f3f4f6' :
                                '#dcfce7',
                      color:
                        expirationStatus.status === 'expired' ? '#dc2626' :
                          expirationStatus.status === 'expires-today' ? '#d97706' :
                            expirationStatus.status === 'expires-soon' ? '#ea580c' :
                              expirationStatus.status === 'no-date' ? '#6b7280' :
                                '#16a34a',
                      border:
                        expirationStatus.status === 'expired' ? '1px solid #fecaca' :
                          expirationStatus.status === 'expires-today' ? '1px solid #fde68a' :
                            expirationStatus.status === 'expires-soon' ? '1px solid #fed7aa' :
                              expirationStatus.status === 'no-date' ? '1px solid #e5e7eb' :
                                '1px solid #bbf7d0'
                    }}>
                      {expirationStatus.status === 'expired' && <i className="bi bi-x-circle-fill" style={{ fontSize: '0.85rem' }}></i>}
                      {expirationStatus.status === 'expires-today' && <i className="bi bi-clock-fill" style={{ fontSize: '0.85rem' }}></i>}
                      {expirationStatus.status === 'expires-soon' && <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '0.85rem' }}></i>}
                      {expirationStatus.status === 'active' && <i className="bi bi-check-circle-fill" style={{ fontSize: '0.85rem' }}></i>}
                      {expirationStatus.status === 'no-date' && <i className="bi bi-calendar-x" style={{ fontSize: '0.85rem' }}></i>}
                      <span>{expirationStatus.text}</span>
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Details Modal */}
          {showModal && selectedItem && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content onboarding-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2>Campaign Details</h2>
                    {selectedItem.testing && (
                      <span style={{
                        backgroundColor: '#ff9800',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
                        animation: 'pulse 2s infinite'
                      }}>
                        <i className="bi bi-beaker" style={{ marginRight: '4px' }}></i>
                        Testing Phase
                      </span>
                    )}
                  </div>
                  <button className="close-modal-btn" onClick={closeModal}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <div className="modal-body">
                  {/* Campaign Information - Heading Outside Box */}
                  <h3 className="section-title"><i className="bi bi-briefcase-fill"></i> Campaign Information</h3>
                  <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
                    <div className="detail-grid">
                      <div className="detail-item">
  <label>Client ID</label>
  <p>{selectedItem.clientsdata_id || '—'}</p>
</div>
                      <div className="detail-item">
                        
                        <label>Campaign</label>
                        <p>{selectedItem.campaign || '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Model</label>
                        <p>{selectedItem.model || '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Extensions</label>
                        <p>{(selectedItem.extensions && selectedItem.extensions.length > 0) ? selectedItem.extensions.join(', ') : '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Server IPs</label>
                        <p>{(selectedItem.serverIPs && selectedItem.serverIPs.length > 0) ? selectedItem.serverIPs.join(', ') : '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Dial Plan</label>
                        <p>{selectedItem.dialplan || '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Start Date</label>
                        <p>{formatDate(selectedItem.startDate)}</p>
                      </div>
                      <div className="detail-item">
                        <label>End Date</label>
                        <p>{formatDate(selectedItem.endDate)}</p>
                      </div>
                      
                    
                    </div>
                  </div>

                  {/* Admin / Validation - Heading Outside Box */}
                  <h3 className="section-title"><i className="bi bi-shield-lock-fill"></i> Admin / Validation</h3>
                  <div className="detail-section admin-validation-section" style={{ gridColumn: '1 / -1' }}>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>IP Validation Link</label>
                        <p>{selectedItem.primaryIpValidation || '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Admin Link</label>
                        <p>{selectedItem.primaryAdminLink || '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Username</label>
                        <p>{selectedItem.primaryUser || '—'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Password</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <p style={{ margin: 0, flex: 1 }}>
                            {selectedItem.primaryPassword ? (showPrimaryPassword ? selectedItem.primaryPassword : '••••••••') : '—'}
                          </p>
                          {selectedItem.primaryPassword && (
                            <button
                              className="password-toggle-btn"
                              onClick={() => setShowPrimaryPassword(!showPrimaryPassword)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                            >
                              <i className={`bi ${showPrimaryPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Closer fields (if present) - Heading Outside Box */}
                  {selectedItem.setupType === 'separate' && (selectedItem.closerAdminLink || selectedItem.closerIpValidation || selectedItem.closerUser) && (
                    <>
                      <h3 className="section-title"><i className="bi bi-people-fill"></i> Closer Dialer</h3>
                      <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
                        <div className="detail-grid">
                          <div className="detail-item">
                            <label>IP Validation Link</label>
                            <p>{selectedItem.closerIpValidation || '—'}</p>
                          </div>
                          <div className="detail-item">
                            <label>Admin Link</label>
                            <p>{selectedItem.closerAdminLink || '—'}</p>
                          </div>
                          <div className="detail-item">
                            <label>Username</label>
                            <p>{selectedItem.closerUser || '—'}</p>
                          </div>
                          <div className="detail-item">
                            <label>Password</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <p style={{ margin: 0, flex: 1 }}>
                                {selectedItem.closerPassword ? (showCloserPassword ? selectedItem.closerPassword : '••••••••') : '—'}
                              </p>
                              {selectedItem.closerPassword && (
                                <button
                                  className="password-toggle-btn"
                                  onClick={() => setShowCloserPassword(!showCloserPassword)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                                >
                                  <i className={`bi ${showCloserPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="modal-footer">
                  <button className="close-btn" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Onboarding;