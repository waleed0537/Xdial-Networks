import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ClientDashboard.css';

const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5010';
  }
  return 'https://xdialnetworks.com';
};

const API_URL = getApiUrl();

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
  // Sorting state
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Table columns config
  const columns = [
    { key: 'sr', label: 'Sr#' },
    { key: 'companyName', label: 'Company' },
    { key: 'campaign', label: 'Campaign' },
    { key: 'model', label: 'Model' },
    { key: 'extensions', label: 'Extensions' },
    { key: 'numberOfBots', label: 'No. of Bots' },
    { key: 'serverIPs', label: 'Server IPs' },
    { key: 'status', label: 'Status' },
    { key: 'expiration', label: 'Expiration' },
    { key: 'dashboard', label: 'Dashboard' }
  ];

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPrimaryPassword, setShowPrimaryPassword] = useState(false);
  const [showCloserPassword, setShowCloserPassword] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  // Copy to clipboard helper
  const copyToClipboard = async (text) => {
    if (!text || text === '—') return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 1200);
    } catch (err) {
      setCopyFeedback('Failed to copy');
      setTimeout(() => setCopyFeedback(''), 1200);
    }
  };
  const [metrics, setMetrics] = useState({
    totalClients: 0,
    activeClients: 0,
    totalBots: 0,
    activeBots: 0,
    totalTestings: 0,
    ongoingTestings: 0,
    testingSuccess: 0,
    testingFails: 0,
    expiringSoon: 0
  });
  useEffect(() => {
    document.title = "Manage - Xdial";
  }, []);
  useEffect(() => {
    const isClient = localStorage.getItem('isClientAuthenticated');
    const isAdmin = localStorage.getItem('isAdminAuthenticated');

    if (!isClient && !isAdmin) {
      navigate('/admin/login');
    } else {
      fetchIntegrations();
    }
  }, [navigate]);
  // REPLACE the calculateMetrics function:
const calculateMetrics = (data) => {
  const onboardedItems = data.filter(item => item.status === 'onboarded');
  
  const uniqueClientIds = new Set(
    onboardedItems
      .filter(item => item.clientsdata_id)
      .map(item => item.clientsdata_id)
  );
  
  const activeClientIds = new Set(
    onboardedItems
      .filter(item => item.clientsdata_id && item.clientAccessEnabled)
      .map(item => item.clientsdata_id)
  );
  
  const totalBots = onboardedItems.reduce((sum, item) => sum + (item.numberOfBots || 0), 0);
  const activeBots = onboardedItems
    .filter(item => item.clientAccessEnabled)
    .reduce((sum, item) => sum + (item.numberOfBots || 0), 0);
  
  // Count testing phase items (status = 'testing')
  const totalTestings = data.filter(item => 
    item.status === 'testing' || item.status === 'testing-failed'
  ).length;
  
  const ongoingTestings = data.filter(item => 
    item.status === 'testing'
  ).length;
  
  const testingSuccess = onboardedItems.length; // All onboarded items completed testing
  
  const testingFails = data.filter(item => 
    item.status === 'testing-failed'
  ).length;
  
  // Campaigns expiring in next 7 days
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  
  const expiringSoon = onboardedItems.filter(item => {
    if (!item.endDate) return false;
    const endDate = new Date(item.endDate);
    const now = new Date();
    return endDate > now && endDate <= sevenDaysFromNow;
  }).length;
  
  setMetrics({
    totalClients: uniqueClientIds.size,
    activeClients: activeClientIds.size,
    totalBots,
    activeBots,
    totalTestings,
    ongoingTestings,
    testingSuccess,
    testingFails,
    expiringSoon
  });
};

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/integration/all?limit=1000`);
      const data = await response.json();

      if (data.success) {
        setItems(data.data || []);
        calculateMetrics(data.data || []);
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

  // Filtered and sorted data
  const filtered = useMemo(() => {
    let arr = items
      .filter(i => {
        // Show only onboarded items
        if (i.status !== 'onboarded') return false;
        if (campaignFilter && i.campaign !== campaignFilter) return false;
        if (modelFilter && i.model !== modelFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          // Gather all searchable fields as strings
          const fields = [
            i.companyName,
            i.campaign,
            i.model,
            i.clientsdata_id,
            i.numberOfBots,
            i.dialplan,
            i.primaryUser,
            i.primaryAdminLink,
            i.primaryIpValidation,
            i.closerUser,
            i.closerAdminLink,
            i.closerIpValidation,
            i.startDate,
            i.endDate,
            ...(Array.isArray(i.extensions) ? i.extensions : []),
            ...(Array.isArray(i.serverIPs) ? i.serverIPs : [])
          ];
          if (!fields.some(f => (f != null && f.toString().toLowerCase().includes(q)))) return false;
        }
        return true;
      });

    // Sorting logic
    if (sortBy) {
      arr = arr.slice().sort((a, b) => {
        let aVal, bVal;
        if (sortBy === 'sr') {
          aVal = items.indexOf(a);
          bVal = items.indexOf(b);
        } else if (sortBy === 'extensions') {
          aVal = (a.extensions && a.extensions.length > 0) ? a.extensions.join(', ') : '';
          bVal = (b.extensions && b.extensions.length > 0) ? b.extensions.join(', ') : '';
        } else if (sortBy === 'serverIPs') {
          aVal = (a.serverIPs && a.serverIPs.length > 0) ? a.serverIPs.join(', ') : '';
          bVal = (b.serverIPs && b.serverIPs.length > 0) ? b.serverIPs.join(', ') : '';
        } else if (sortBy === 'expiration') {
          aVal = a.endDate || '';
          bVal = b.endDate || '';
        } else if (sortBy === 'dashboard') {
          aVal = a.clientsdata_id || '';
          bVal = b.clientsdata_id || '';
        } else {
          aVal = a[sortBy] != null ? a[sortBy] : '';
          bVal = b[sortBy] != null ? b[sortBy] : '';
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return sortOrder === 'asc'
          ? aVal.toString().localeCompare(bVal.toString())
          : bVal.toString().localeCompare(aVal.toString());
      });
    } else {
      // Default: sort by company name
      arr = arr.slice().sort((a, b) => {
        const nameA = (a.companyName || '').toLowerCase();
        const nameB = (b.companyName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }
    return arr;
  }, [items, search, campaignFilter, modelFilter, sortBy, sortOrder]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
        const updatedItems = prev.map(it => it.id === id ? data.data : it);
        setItems(updatedItems);
        calculateMetrics(updatedItems);
      } else {
        console.error('Failed to update access:', data.message || data);
        fetchIntegrations();
      }
    } catch (err) {
      console.error('Error updating access:', err);
      fetchIntegrations();
    }
  };

  const handleDashboardLogin = async (item) => {
    try {
      if (!item.clientsdata_id) {
        alert('Client ID not found');
        return;
      }

      // Call our backend to authenticate with the dashboard
      const response = await fetch(`${API_URL}/api/client/dashboard-auth/${item.clientsdata_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!data.success || !data.authData) {
        alert(data.message || 'Failed to authenticate with dashboard');
        return;
      }

      // Store auth data temporarily with a timestamp-based key
      const tempKey = `temp_auth_${Date.now()}`;
      localStorage.setItem(tempKey, JSON.stringify(data.authData));

      // Open new window with dashboard URL and temp key
      const newWindow = window.open(
        `https://test.dashboard.xlite.xdialnetworks.com/dashboard?tempAuth=${tempKey}`,
        '_blank'
      );

      if (!newWindow) {
        localStorage.removeItem(tempKey);
        alert('Please allow popups to open client dashboard');
        return;
      }

      console.log(`Successfully opened dashboard for client ${item.clientsdata_id}`);

    } catch (error) {
      console.error('Error opening client dashboard:', error);
      alert('Failed to open client dashboard');
    }
  };

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
          {error && (
            <div className="error-banner">
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          <div className="metrics-bar">
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Total Clients</span>
                <span className="metric-value">{metrics.totalClients}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Active Clients</span>
                <span className="metric-value highlight">{metrics.activeClients}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Total Bots</span>
                <span className="metric-value">{metrics.totalBots}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Active Bots</span>
                <span className="metric-value highlight">{metrics.activeBots}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Testing History</span>
                <span className="metric-value">{metrics.totalTestings}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Trials</span>
                <span className="metric-value warning">{metrics.ongoingTestings}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Test Success</span>
                <span className="metric-value success">{metrics.testingSuccess}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Test Fails</span>
                <span className="metric-value danger">{metrics.testingFails}</span>
              </div>
              <div className="metric-divider"></div>

              <div className="metric-item">
                <span className="metric-label">Expiring Soon</span>
                <span className="metric-value warning">{metrics.expiringSoon}</span>
              </div>
            </div>
          </div>

          <div className="filters-row" style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'start' }}></div>

          <div className="filters-row" style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'start' }}>
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

          <div className="list-table" style={{ width: '100%' }}>
            <div className="list-row header">
              {columns.map(col => (
                <strong
                  key={col.key}
                  style={{ cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => {
                    if (sortBy === col.key) {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy(col.key);
                      setSortOrder('asc');
                    }
                  }}
                >
                  {col.label}
                  {sortBy === col.key && (
                    <span style={{ fontSize: '12px' }}>
                      {sortOrder === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </strong>
              ))}
            </div>

            {filtered.map((item, idx) => {
              const expirationStatus = getExpirationStatus(item.endDate);
              return (
                <div key={item.id} className="list-row" onClick={() => openModal(item)} style={{ alignItems: 'start', minHeight: '50px' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px', position: 'relative' }}>
                    <span style={{ fontWeight: 600 }}>{idx + 1}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px', position: 'relative' }}>
                    <span style={{ fontWeight: 600 }}>{item.companyName || '—'}</span>
                    {item.status === 'testing' && (
                      <span style={{
                        backgroundColor: '#ff9800',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        animation: 'pulse 2s infinite',
                        display: 'inline-flex',
                        alignItems: 'start',
                        gap: '4px'
                      }}>
                        <i className="bi bi-beaker" style={{ fontSize: '10px' }}></i>
                        Testing
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <span>{item.campaign || '—'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <span>{item.model || '—'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <i className="bi bi-telephone-fill"></i>
                    <span>{(item.extensions && item.extensions.length > 0) ? item.extensions.join(', ') : '—'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <span>{item.numberOfBots != null ? item.numberOfBots : '—'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <i className="bi bi-hdd-network-fill"></i>
                    <span>{(item.serverIPs && item.serverIPs.length > 0) ? item.serverIPs.join(', ') : '—'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <label className="switch" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={!!item.clientAccessEnabled} onChange={() => handleToggleAccess(item.id, !!item.clientAccessEnabled)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'start',
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
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                    <button
                      className="dashboard-btn"
                      onClick={() => handleDashboardLogin(item)}
                      disabled={!item.clientsdata_id}
                      title={item.clientsdata_id ? "Open Dashboard" : "Client ID not set"}
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {showModal && selectedItem && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content onboarding-modal" onClick={(e) => e.stopPropagation()}>
                // REPLACE the modal header section:
<div className="modal-header">
  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
    <h2>Campaign Details</h2>
    {selectedItem.status === 'testing' && (
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
                  <h3 className="section-title"><i className="bi bi-briefcase-fill"></i> Campaign Information</h3>
                  <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
                    <div className="detail-grid">
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.companyName || '—')}>
                        <label>Client Name</label>
                        <p>{selectedItem.companyName || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.clientsdata_id || '—')}>
                        <label>Client ID</label>
                        <p>{selectedItem.clientsdata_id || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.campaign || '—')}>
                        <label>Campaign</label>
                        <p>{selectedItem.campaign || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.model || '—')}>
                        <label>Model</label>
                        <p>{selectedItem.model || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.numberOfBots != null ? selectedItem.numberOfBots : '—')}>
                        <label>Number of Bots</label>
                        <p>{selectedItem.numberOfBots != null ? selectedItem.numberOfBots : '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard((selectedItem.extensions && selectedItem.extensions.length > 0) ? selectedItem.extensions.join(', ') : '—')}>
                        <label>Extensions</label>
                        <p>{(selectedItem.extensions && selectedItem.extensions.length > 0) ? selectedItem.extensions.join(', ') : '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard((selectedItem.serverIPs && selectedItem.serverIPs.length > 0) ? selectedItem.serverIPs.join(', ') : '—')}>
                        <label>Server IPs</label>
                        <p>{(selectedItem.serverIPs && selectedItem.serverIPs.length > 0) ? selectedItem.serverIPs.join(', ') : '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.dialplan || '—')}>
                        <label>Dial Plan</label>
                        <p>{selectedItem.dialplan || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(formatDate(selectedItem.startDate))}>
                        <label>Start Date</label>
                        <p>{formatDate(selectedItem.startDate)}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(formatDate(selectedItem.endDate))}>
                        <label>End Date</label>
                        <p>{formatDate(selectedItem.endDate)}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="section-title"><i className="bi bi-shield-lock-fill"></i> Admin / Validation</h3>
                  <div className="detail-section admin-validation-section" style={{ gridColumn: '1 / -1' }}>
                    <div className="detail-grid">
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.primaryIpValidation || '—')}>
                        <label>IP Validation Link</label>
                        <p>{selectedItem.primaryIpValidation || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.primaryAdminLink || '—')}>
                        <label>Admin Link</label>
                        <p>{selectedItem.primaryAdminLink || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.primaryUser || '—')}>
                        <label>Username</label>
                        <p>{selectedItem.primaryUser || '—'}</p>
                      </div>
                      <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.primaryPassword ? selectedItem.primaryPassword : '—')}>
                        <label>Password</label>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
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

                  {selectedItem.setupType === 'separate' && (selectedItem.closerAdminLink || selectedItem.closerIpValidation || selectedItem.closerUser) && (
                    <>
                      <h3 className="section-title"><i className="bi bi-people-fill"></i> Closer Dialer</h3>
                      <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
                        <div className="detail-grid">
                          <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.closerIpValidation || '—')}>
                            <label>IP Validation Link</label>
                            <p>{selectedItem.closerIpValidation || '—'}</p>
                          </div>
                          <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.closerAdminLink || '—')}>
                            <label>Admin Link</label>
                            <p>{selectedItem.closerAdminLink || '—'}</p>
                          </div>
                          <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.closerUser || '—')}>
                            <label>Username</label>
                            <p>{selectedItem.closerUser || '—'}</p>
                          </div>
                          <div className="detail-item" style={{cursor:'pointer'}} onClick={() => copyToClipboard(selectedItem.closerPassword ? selectedItem.closerPassword : '—')}>
                            <label>Password</label>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
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

                {copyFeedback && (
                  <div style={{position:'fixed',top:'24px',right:'24px',zIndex:9999,background:'#111827',color:'#fff',padding:'8px 18px',borderRadius:'8px',fontWeight:600,boxShadow:'0 2px 8px rgba(0,0,0,0.12)'}}>
                    {copyFeedback}
                  </div>
                )}
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