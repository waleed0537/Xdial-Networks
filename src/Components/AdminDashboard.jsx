import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0
  });

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch integration requests
  useEffect(() => {
    fetchIntegrations();
  }, []);

  // Filter integrations based on status and search
  useEffect(() => {
    let filtered = integrations;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIntegrations(filtered);
  }, [statusFilter, searchTerm, integrations]);

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/integration/all');
      const data = await response.json();

      if (data.success) {
        setIntegrations(data.data);
        setFilteredIntegrations(data.data);
        calculateStats(data.data);
      } else {
        setError('Failed to fetch integration requests');
      }
    } catch (err) {
      console.error('Error fetching integrations:', err);
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      pending: data.filter(item => item.status === 'pending').length,
      inProgress: data.filter(item => item.status === 'in-progress').length,
      completed: data.filter(item => item.status === 'completed').length,
      cancelled: data.filter(item => item.status === 'cancelled').length
    };
    setStats(stats);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const viewDetails = (integration) => {
    setSelectedIntegration(integration);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIntegration(null);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/integration/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setIntegrations(prev =>
          prev.map(item =>
            item._id === id ? { ...item, status: newStatus } : item
          )
        );
        
        if (selectedIntegration && selectedIntegration._id === id) {
          setSelectedIntegration({ ...selectedIntegration, status: newStatus });
        }

        // Recalculate stats
        const updatedIntegrations = integrations.map(item =>
          item._id === id ? { ...item, status: newStatus } : item
        );
        calculateStats(updatedIntegrations);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteIntegration = async (id) => {
    if (!window.confirm('Are you sure you want to delete this integration request?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/integration/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev => prev.filter(item => item._id !== id));
        calculateStats(integrations.filter(item => item._id !== id));
        closeModal();
      }
    } catch (err) {
      console.error('Error deleting integration:', err);
    }
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1><i className="bi bi-speedometer2"></i> Admin Dashboard</h1>
            <p>Manage integration requests</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <i className="bi bi-list-check"></i>
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Requests</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">
            <i className="bi bi-clock-history"></i>
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
        </div>

        <div className="stat-card stat-progress">
          <div className="stat-icon">
            <i className="bi bi-arrow-repeat"></i>
          </div>
          <div className="stat-info">
            <p className="stat-label">In Progress</p>
            <h3 className="stat-value">{stats.inProgress}</h3>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>
          <div className="stat-info">
            <p className="stat-label">Completed</p>
            <h3 className="stat-value">{stats.completed}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by company, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filters">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
        </div>

        <button className="refresh-btn" onClick={fetchIntegrations}>
          <i className="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        {error && (
          <div className="error-banner">
            <i className="bi bi-exclamation-triangle-fill"></i>
            {error}
          </div>
        )}

        {filteredIntegrations.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h3>No integration requests found</h3>
            <p>There are no requests matching your current filters.</p>
          </div>
        ) : (
          <table className="integrations-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Setup Type</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIntegrations.map((integration) => (
                <tr key={integration._id}>
                  <td>
                    <strong>{integration.companyName}</strong>
                  </td>
                  <td>{integration.contactPerson}</td>
                  <td>{integration.email}</td>
                  <td>
                    <span className="setup-type">
                      {integration.setupType === 'same' ? 'Same Dialler' : 'Separate Dialler'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(integration.status)}`}>
                      {getStatusLabel(integration.status)}
                    </span>
                  </td>
                  <td>{formatDate(integration.submittedAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view-btn"
                        onClick={() => viewDetails(integration)}
                        title="View Details"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedIntegration && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Integration Request Details</h2>
              <button className="close-modal-btn" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">
              {/* Status Update */}
              <div className="detail-section">
                <h3><i className="bi bi-flag-fill"></i> Status</h3>
                <div className="status-selector">
                  <select
                    value={selectedIntegration.status}
                    onChange={(e) => updateStatus(selectedIntegration._id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Company Info */}
              <div className="detail-section">
                <h3><i className="bi bi-building"></i> Company Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Company Name</label>
                    <p>{selectedIntegration.companyName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Contact Person</label>
                    <p>{selectedIntegration.contactPerson}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <p>{selectedIntegration.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    <p>{selectedIntegration.phone}</p>
                  </div>
                </div>
              </div>

              {/* Remote Agent Setup */}
              <div className="detail-section">
                <h3><i className="bi bi-gear-fill"></i> Remote Agent Setup</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Admin Access</label>
                    <p>{selectedIntegration.adminAccess}</p>
                  </div>
                  <div className="detail-item">
                    <label>SIP Series</label>
                    <p>{selectedIntegration.sipSeries}</p>
                  </div>
                  <div className="detail-item">
                    <label>Port Extension</label>
                    <p>{selectedIntegration.portExtension}</p>
                  </div>
                </div>
              </div>

              {/* Transfer Setup */}
              <div className="detail-section">
                <h3><i className="bi bi-arrow-left-right"></i> Transfer Setup</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Setup Type</label>
                    <p className="setup-type-badge">
                      {selectedIntegration.setupType === 'same' ? 'Same Dialler' : 'Separate Dialler'}
                    </p>
                  </div>
                  
                  {selectedIntegration.setupType === 'same' ? (
                    <>
                      <div className="detail-item">
                        <label>Verifier Campaign</label>
                        <p>{selectedIntegration.verifierCampaign}</p>
                      </div>
                      <div className="detail-item">
                        <label>Inbound Group</label>
                        <p>{selectedIntegration.inboundGroup}</p>
                      </div>
                      <div className="detail-item">
                        <label>User Group</label>
                        <p>{selectedIntegration.userGroup}</p>
                      </div>
                    </>
                  ) : (
                    <div className="detail-item">
                      <label>Closer Dialler Access</label>
                      <p>{selectedIntegration.closerDiallerAccess}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              {selectedIntegration.additionalNotes && (
                <div className="detail-section">
                  <h3><i className="bi bi-chat-left-text-fill"></i> Additional Notes</h3>
                  <div className="notes-box">
                    <p>{selectedIntegration.additionalNotes}</p>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="detail-section">
                <h3><i className="bi bi-clock-fill"></i> Timestamps</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Submitted At</label>
                    <p>{formatDate(selectedIntegration.submittedAt)}</p>
                  </div>
                  <div className="detail-item">
                    <label>Last Updated</label>
                    <p>{formatDate(selectedIntegration.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="delete-btn"
                onClick={() => deleteIntegration(selectedIntegration._id)}
              >
                <i className="bi bi-trash-fill"></i>
                Delete Request
              </button>
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

export default AdminDashboard;