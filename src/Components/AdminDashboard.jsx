import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/AdminDashboard.css';

// Environment detection
const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5010';
  }
  return 'https://xdialnetworks.com';
};

const API_URL = getApiUrl();

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [showStatusHistory, setShowStatusHistory] = useState(false);


  const [campaignResources, setCampaignResources] = useState({
    longScript: '',
    clientDashboard: '',
    disposition: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0
  });


  // Completion requirements
  const [completionChecks, setCompletionChecks] = useState({
    longScript: false,
    clientDashboard: false,
    disposition: false
  });

  // Campaign configuration
  const campaignConfig = {
    'Medicare': ['Basic', 'Advanced'],
    'Final Expense': ['Basic', 'Advanced'],
    'MVA': ['Basic'],
    'Auto Insurance': ['Basic', 'Advanced'],
    'Auto Warranty': ['Advanced'],
    'ACA': ['Basic'],
    'Home': ['Basic'],
    'Medalert': ['Advanced']
  };

  const basicTransferOptions = [
    { value: 'high-quality', label: 'High-Quality Transfers' },
    { value: 'balanced', label: 'Balanced Transfers' },
    { value: 'broader', label: 'Broader Transfers' }
  ];

  const advancedTransferOptions = [
    { value: 'balanced-broad', label: 'Balanced Broad' },
    { value: 'balanced-qualified', label: 'Balanced Qualified' }
  ];
  useEffect(() => {
    document.title = "Onboarding - Xdial";
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);
  // Auto-set model when campaign changes

  useEffect(() => {
    fetchIntegrations();
  }, []);

  useEffect(() => {
    let filtered = integrations;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (campaignFilter !== 'all') {
      filtered = filtered.filter(item => item.campaign === campaignFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.clientsdata_id && item.clientsdata_id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredIntegrations(filtered);
  }, [statusFilter, campaignFilter, searchTerm, integrations]);

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/integration/all`);
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

  // REPLACE calculateStats function:
  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      pending: data.filter(item => item.status === 'pending').length,
      inProgress: data.filter(item => item.status === 'in-progress').length,
      completed: data.filter(item => item.status === 'onboarded').length,
      cancelled: data.filter(item => item.status === 'cancelled').length
    };
    setStats(stats);
  };

  const handleLogout = () => {
    navigate('/client-management');
  };

  const viewDetails = (integration) => {
    setSelectedIntegration(integration);
    setShowModal(true);

    // Load completion checks
    if (integration.completionRequirements) {
      setCompletionChecks(integration.completionRequirements);
    } else {
      setCompletionChecks({
        longScript: false,
        clientDashboard: false,
        disposition: false
      });
    }
  };
  const updateTestingStatus = async (value) => {
    if (!selectedIntegration) return;

    setTestingStatus(value);

    try {
      const response = await fetch(`${API_URL}/api/integration/${selectedIntegration.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testing: value })
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev =>
          prev.map(item =>
            item.id === selectedIntegration.id ?
              { ...item, testing: value } : item
          )
        );

        setSelectedIntegration({ ...selectedIntegration, testing: value });

        let message = '';
        if (value === 'in-progress') message = 'Testing phase started';
        else if (value === 'completed') message = 'Testing marked as completed';
        else if (value === 'failed') message = 'Testing marked as failed';
        else message = 'Testing phase removed';

        setCopyFeedback(message);
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    } catch (err) {
      console.error('Error updating testing status:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowResourceModal(false);
    setSelectedIntegration(null);
    setEditingField(null);
    setEditValue('');
    setIsEditMode(false);
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`${label} copied!`);
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyFeedback('Failed to copy');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const startEditing = (field, currentValue) => {
    setEditingField(field);
    const isArrayField = ['extensions', 'serverIPs'].includes(field);

    if (isArrayField) {
      // Convert array to newline-separated string
      const textValue = Array.isArray(currentValue) && currentValue.length > 0
        ? currentValue.join('\n')
        : '';
      setEditValue(textValue);
    } else {
      const stringValue = Array.isArray(currentValue) ? '' : (currentValue || '');
      setEditValue(stringValue);
    }
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveField = async (field) => {
    if (!selectedIntegration) return;

    const isArrayField = ['extensions', 'serverIPs'].includes(field);
    const isDateField = ['startDate', 'endDate'].includes(field);

    let valueToSave;
    if (isArrayField) {
      valueToSave = editValue
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
    } else if (isDateField) {
      valueToSave = editValue ? new Date(editValue).toISOString() : null;
    } else if (field === 'clientsdata_id') {
      valueToSave = editValue === '' ? null : parseInt(editValue) || null;
    } else {
      valueToSave = editValue;
    }

    try {
      const response = await fetch(`${API_URL}/api/integration/${selectedIntegration.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: valueToSave })
      });

      const data = await response.json();

      if (data.success) {
        const updatedIntegrations = integrations.map(item =>
          item.id === selectedIntegration.id ? { ...item, [field]: valueToSave } : item
        );
        setIntegrations(updatedIntegrations);
        setFilteredIntegrations(updatedIntegrations);
        setSelectedIntegration({ ...selectedIntegration, [field]: valueToSave });

        setEditingField(null);
        setEditValue('');
      } else {
        throw new Error(data.message || 'Failed to save changes');
      }
    } catch (err) {
      console.error('Error updating field:', err);
      const errorMessage = err.message || 'Failed to update field';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);

      setEditingField(null);
      setEditValue('');
    }
  };

  const updateCompletionCheck = async (field, value) => {
    if (!selectedIntegration) return;

    const newChecks = { ...completionChecks, [field]: value };
    setCompletionChecks(newChecks);

    try {
      const response = await fetch(`${API_URL}/api/integration/${selectedIntegration.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completionRequirements: newChecks })
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev =>
          prev.map(item =>
            item.id === selectedIntegration.id ?
              { ...item, completionRequirements: newChecks } : item
          )
        );

        setSelectedIntegration({ ...selectedIntegration, completionRequirements: newChecks });
      }
    } catch (err) {
      console.error('Error updating completion check:', err);
    }
  };

  const allCompletionChecksMet = () => {
    return completionChecks.longScript &&
      completionChecks.clientDashboard &&
      completionChecks.disposition;
  };

  const openResourceModal = () => {
    setCampaignResources({
      longScript: selectedIntegration?.campaignResources?.longScript || '',
      clientDashboard: selectedIntegration?.campaignResources?.clientDashboard || '',
      disposition: selectedIntegration?.campaignResources?.disposition || ''
    });
    setShowResourceModal(true);
  };

  const saveCampaignResources = async () => {
    if (!selectedIntegration) return;

    try {
      const response = await fetch(`${API_URL}/api/integration/${selectedIntegration.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignResources })
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev =>
          prev.map(item =>
            item.id === selectedIntegration.id ?
              { ...item, campaignResources } : item
          )
        );

        setSelectedIntegration({ ...selectedIntegration, campaignResources });
        setShowResourceModal(false);
        setCopyFeedback('Campaign resources updated!');
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    } catch (err) {
      console.error('Error updating campaign resources:', err);
      alert('Failed to update campaign resources');
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (newStatus === 'onboarded' && !allCompletionChecksMet()) {
      alert('Cannot mark as onboarded! Please ensure all requirements are checked:\n- Long Script\n- Client Dashboard\n- Disposition');
      return;
    }

    if (newStatus === 'onboarded' && (!selectedIntegration.clientsdata_id || selectedIntegration.clientsdata_id === null)) {
      alert('Cannot mark as onboarded! Please assign a Client ID first.');
      return;
    }

    try {
      const updateData = { status: newStatus };

      if (newStatus === 'onboarded') {
        updateData.clientAccessEnabled = true;
      }

      const response = await fetch(`${API_URL}/api/integration/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev =>
          prev.map(item =>
            item.id === id ? {
              ...item,
              status: newStatus,
              statusHistory: data.data.statusHistory,
              clientAccessEnabled: newStatus === 'onboarded' ? true : item.clientAccessEnabled
            } : item
          )
        );

        if (selectedIntegration && selectedIntegration.id === id) {
          setSelectedIntegration({
            ...selectedIntegration,
            status: newStatus,
            statusHistory: data.data.statusHistory,
            clientAccessEnabled: newStatus === 'onboarded' ? true : selectedIntegration.clientAccessEnabled
          });
        }

        const updatedIntegrations = integrations.map(item =>
          item.id === id ? {
            ...item,
            status: newStatus,
            statusHistory: data.data.statusHistory,
            clientAccessEnabled: newStatus === 'onboarded' ? true : item.clientAccessEnabled
          } : item
        );
        calculateStats(updatedIntegrations);

        if (newStatus === 'onboarded') {
          setCopyFeedback('Status updated to Onboarded! Client access enabled.');
          setTimeout(() => setCopyFeedback(''), 3000);
        } else {
          setCopyFeedback(`Status updated to ${getStatusLabel(newStatus)}`);
          setTimeout(() => setCopyFeedback(''), 2000);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const deleteStatusHistoryEntry = async (entry) => {
    if (!selectedIntegration) return;

    if (!window.confirm('Are you sure you want to delete this status history entry?')) {
      return;
    }

    try {
      const updatedHistory = [...(selectedIntegration.statusHistory || [])];

      // Find the exact index of the entry in the original history array
      const idx = updatedHistory.findIndex(e => (
        e.timestamp === entry.timestamp &&
        e.action === entry.action &&
        e.fromStatus === entry.fromStatus &&
        e.toStatus === entry.toStatus
      ));

      if (idx === -1) {
        // Entry not found; abort
        return;
      }

      updatedHistory.splice(idx, 1);

      const response = await fetch(`${API_URL}/api/integration/${selectedIntegration.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusHistory: updatedHistory })
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev =>
          prev.map(item =>
            item.id === selectedIntegration.id ?
              { ...item, statusHistory: updatedHistory } : item
          )
        );

        setSelectedIntegration({ ...selectedIntegration, statusHistory: updatedHistory });

        setCopyFeedback('History entry deleted');
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    } catch (err) {
      console.error('Error deleting history entry:', err);
      alert('Failed to delete history entry');
    }
  };

  const deleteIntegration = async (id) => {
    if (!window.confirm('Are you sure you want to delete this integration request?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/integration/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setIntegrations(prev => prev.filter(item => item.id !== id));
        calculateStats(integrations.filter(item => item.id !== id));
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

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Replace getStatusBadgeClass function
const getStatusBadgeClass = (status) => {
  const statusMap = {
    'pending': 'status-pending',
    'in-progress': 'status-in-progress',
    'onboarded': 'status-completed',
    'testing': 'status-testing',
    'testing-failed': 'status-cancelled',
    'offboarded': 'status-offboarded',
    'cancelled': 'status-cancelled',
    'paused': 'status-paused'
  };
  return statusMap[status] || 'status-pending';
};

  // Replace getStatusLabel function
const getStatusLabel = (status) => {
  const labelMap = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'onboarded': 'Onboarded',
    'testing': 'Testing',
    'testing-failed': 'Testing Failed',
    'offboarded': 'Offboarded',
    'cancelled': 'Cancelled',
    'paused': 'Paused'
  };
  return labelMap[status] || status;
};

  const EditableField = ({ field, value, label, type = 'text', isTextarea = false, options = null }) => {
    const isEditing = editingField === field && isEditMode;

    if (type === 'date') {
      return (
        <div className="form-field">
          <label>{label}</label>
          {isEditMode && isEditing ? (
            <div className="field-edit-group">
              <input
                type="date"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                className="form-input"
              />
              <div className="field-actions-inline">
                <button className="save-btn-sm" onClick={() => saveField(field)} title="Save">
                  <i className="bi bi-check-lg"></i>
                </button>
                <button className="cancel-btn-sm" onClick={cancelEditing} title="Cancel">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (isEditMode) startEditing(field, value);
              }}
              style={{ cursor: isEditMode ? 'pointer' : 'default' }}
            >
              {isEditMode ? (
                <p className="field-value" style={{ cursor: 'pointer', padding: '8px', background: '#f9fafb', borderRadius: '4px' }}>
                  {value || 'Not set'}
                </p>
              ) : (
                <p className="field-value">{value ? formatDate(new Date(value)) : 'Not set'}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    if (isTextarea) {
      return (
        <div className="form-field full-width">
          <label>{label}</label>
          {isEditMode && isEditing ? (
            <div className="edit-mode">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows="4"
                autoFocus
                className="form-textarea"
              />
              <div className="field-actions">
                <button className="save-btn" onClick={() => saveField(field)}>
                  <i className="bi bi-check-lg"></i> Save
                </button>
                <button className="cancel-btn" onClick={cancelEditing}>
                  <i className="bi bi-x-lg"></i> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (isEditMode) startEditing(field, value);
              }}
              style={{ cursor: isEditMode ? 'pointer' : 'default' }}
            >
              {isEditMode ? (
                <p className="field-value" style={{ cursor: 'pointer', padding: '8px', background: '#f9fafb', borderRadius: '4px' }}>
                  {value || '-'}
                </p>
              ) : (
                <p className="field-value">{value || '-'}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    if (options) {
      return (
        <div className="form-field">
          <label>{label}</label>
          {isEditMode && isEditing ? (
            <div className="field-edit-group">
              <select
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                className="form-select"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option.value || option} value={option.value || option}>
                    {option.label || option}
                  </option>
                ))}
              </select>
              <div className="field-actions-inline">
                <button className="save-btn-sm" onClick={() => saveField(field)} title="Save">
                  <i className="bi bi-check-lg"></i>
                </button>
                <button className="cancel-btn-sm" onClick={cancelEditing} title="Cancel">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (isEditMode) startEditing(field, value);
              }}
              style={{ cursor: isEditMode ? 'pointer' : 'default' }}
            >
              {isEditMode ? (
                <p className="field-value" style={{ cursor: 'pointer', padding: '8px', background: '#f9fafb', borderRadius: '4px' }}>
                  {value || '-'}
                </p>
              ) : (
                <p className="field-value">{value || '-'}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="form-field">
        <label>{label}</label>
        {isEditMode && isEditing ? (
          <div className="field-edit-group">
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
              className="form-input"
            />
            <div className="field-actions-inline">
              <button className="save-btn-sm" onClick={() => saveField(field)} title="Save">
                <i className="bi bi-check-lg"></i>
              </button>
              <button className="cancel-btn-sm" onClick={cancelEditing} title="Cancel">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (isEditMode) startEditing(field, value);
            }}
            style={{ cursor: isEditMode ? 'pointer' : 'default' }}
          >
            {isEditMode ? (
              <p className="field-value" style={{ cursor: 'pointer', padding: '8px', background: '#f9fafb', borderRadius: '4px' }}>
                {value || '-'}
              </p>
            ) : (
              <p className="field-value">{value || '-'}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const EditableArrayField = ({ field, value, label }) => {
    const isEditing = editingField === field && isEditMode;

    // Local state for quick add input
    const [newItem, setNewItem] = useState('');

    // Add item on Enter key
    const handleAddInputKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addItem();
      }
    }    

    // Convert value array to plain text for display
    const valueAsText = Array.isArray(value) && value.length > 0
      ? value.join('\n')
      : '';

    // When entering edit mode, ensure the quick-add input is cleared
    useEffect(() => {
      if (isEditing) setNewItem('');
    }, [isEditing]);

    const items = editValue ? editValue.split('\n').map(s => s.trim()).filter(Boolean) : [];

    const addItem = () => {
      const trimmed = (newItem || '').trim();
      if (!trimmed) return;
      const updated = items.concat([trimmed]);
      setEditValue(updated.join('\n'));
      setNewItem('');
    };

    const removeItem = (idx) => {
      const updated = items.filter((_, i) => i !== idx);
      setEditValue(updated.join('\n'));
    };

    return (
      <div className="form-field full-width">
        <label>{label}</label>
        {isEditMode && isEditing ? (
          <div className="edit-mode">
            <div className="array-chips-row" style={{ marginBottom: '8px', direction: 'ltr' }}>
              {items.length > 0 ? items.map((it, i) => (
                <span key={i} className="array-chip">
                  <span className="array-chip-text">{it}</span>
                  <button type="button" className="array-chip-remove" onClick={() => removeItem(i)} title="Remove">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </span>
              )) : (
                <small className="array-empty">No {label.toLowerCase()} added yet</small>
              )}
            </div>

            <div className="array-add-row" style={{ marginBottom: '8px' }}>
              <input
                  type="text"
                  className="array-add-input"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={handleAddInputKeyDown}
                  placeholder={`Add ${label.replace(/s$/, '')}`}
                  dir="ltr"
                />
                <button type="button" className="array-add-btn" onClick={addItem}>
                  Add
                </button>
            </div>

            <div style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}>
              <pre style={{
                margin: 0,
                padding: '12px',
                fontFamily: '"Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                direction: 'ltr',
                textAlign: 'left',
                unicodeBidi: 'bidi-override',
                color: '#000',
                backgroundColor: '#f9fafb'
              }}>
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows="4"
                  placeholder="Enter one value per line"
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    direction: 'ltr',
                    textAlign: 'left',
                    unicodeBidi: 'bidi-override',
                    backgroundColor: '#f9fafb',
                    color: '#000',
                    resize: 'vertical',
                    padding: '0',
                    margin: '0'
                  }}
                />
              </pre>
            </div>

            <small style={{ display: 'block', marginTop: '5px', color: '#666', direction: 'ltr' }}>
              Enter one {label.toLowerCase().replace(/s$/, '')} per line
            </small>
            <div className="field-actions">
              <button className="save-btn" onClick={() => saveField(field)}>
                <i className="bi bi-check-lg"></i> Save
              </button>
              <button className="cancel-btn" onClick={cancelEditing}>
                <i className="bi bi-x-lg"></i> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (isEditMode) startEditing(field, value);
            }}
            style={{ cursor: isEditMode ? 'pointer' : 'default' }}
          >
            <div className="array-display">
              {value && value.length > 0 ? (
                <pre style={{
                  margin: '0',
                  padding: '8px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '13px',
                  direction: 'ltr',
                  textAlign: 'left',
                  unicodeBidi: 'bidi-override',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  color: '#000',
                  maxHeight: '150px',
                  overflow: 'auto'
                }}>
                  {valueAsText}
                </pre>
              ) : (
                <p className="field-value">-</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  const EditableLinkField = ({ field, value, label }) => {
    const isEditing = editingField === field && isEditMode;

    return (
      <div className="form-field">
        <label>{label}</label>
        {isEditMode && isEditing ? (
          <div className="field-edit-group">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
              className="form-input"
            />
            <div className="field-actions-inline">
              <button className="save-btn-sm" onClick={() => saveField(field)} title="Save">
                <i className="bi bi-check-lg"></i>
              </button>
              <button className="cancel-btn-sm" onClick={cancelEditing} title="Cancel">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (isEditMode) startEditing(field, value);
            }}
            style={{ cursor: isEditMode ? 'pointer' : 'default' }}
          >
            <div className="link-field">
              <a
                href={value && value.startsWith('http') ? value : (value ? `https://${value}` : '#')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (isEditMode) {
                    e.preventDefault();
                    e.stopPropagation();
                    startEditing(field, value);
                  }
                }}
              >
                {value || '-'}
              </a>
              <button
                className="copy-btn"
                onClick={(e) => { e.stopPropagation(); copyToClipboard(value, label); }}
                title="Copy to clipboard"
              >
                <i className="bi bi-clipboard"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }
  const StatusHistoryTimeline = ({ history, onDelete }) => {
    if (!history || history.length === 0) {
      return <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No status changes yet</p>;
    }

    // Sort history so newest entries appear first
    const sorted = [...history].slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
      <div className="status-timeline">
        {sorted.map((entry, index) => (
          <div key={index} className="timeline-entry">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-action">
                {entry.action}
                <button
                  className="delete-history-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry);
                  }}
                  title="Delete this entry"
                  style={{
                    marginLeft: '12px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#dc2626',
                    background: 'transparent',
                    border: '1px solid #fca5a5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.borderColor = '#dc2626';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#fca5a5';
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
              <div className="timeline-meta">
                <span className="timeline-from">{getStatusLabel(entry.fromStatus)}</span>
                <i className="bi bi-arrow-right"></i>
                <span className="timeline-to">{getStatusLabel(entry.toStatus)}</span>
              </div>
              <div className="timeline-date">{formatDate(entry.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      {copyFeedback && (
        <div className="copy-toast">
          <i className="bi bi-check-circle-fill"></i>
          {copyFeedback}
        </div>
      )}

      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1><i className="bi bi-speedometer2"></i> Onboarding</h1>
            <p>Manage AI bot integration requests</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="logout-btn" onClick={() => navigate('/integration-form')}>
              <i className="bi bi-file-earmark-plus"></i>
              Add Client
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Client Management
            </button>
          </div>
        </div>
      </header>

      <div className="stats-container">
        <div className="stat-card stat-total">

          <div className="stat-info">
            <p className="stat-label">Total Requests</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>

        <div className="stat-card stat-pending">

          <div className="stat-info">
            <p className="stat-label">Pending</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
        </div>

        <div className="stat-card stat-progress">

          <div className="stat-info">
            <p className="stat-label">In Progress</p>
            <h3 className="stat-value">{stats.inProgress}</h3>
          </div>
        </div>

        <div className="stat-card stat-completed">

          <div className="stat-info">
            <p className="stat-label">Completed</p>
            <h3 className="stat-value">{stats.completed}</h3>
          </div>
        </div>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by company, contact, email, client ID, or campaign..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

<div className="filter-group">
  <select
    className="status-filter-dropdown"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All Statuses</option>
    <option value="pending">Pending</option>
    <option value="in-progress">In Progress</option>
    <option value="onboarded">Onboarded</option>
    <option value="testing">Testing</option>
    <option value="testing-failed">Testing Failed</option>
    <option value="paused">Paused</option>
    <option value="offboarded">Offboarded</option>
    <option value="cancelled">Cancelled</option>
  </select>

  <select
    className="campaign-filter"
    value={campaignFilter}
    onChange={(e) => setCampaignFilter(e.target.value)}
  >
    <option value="all">All Campaigns</option>
    <option value="Medicare">Medicare</option>
    <option value="Final Expense">Final Expense</option>
    <option value="MVA">MVA</option>
    <option value="Auto Insurance">Auto Insurance</option>
    <option value="Auto Warranty">Auto Warranty</option>
    <option value="ACA">ACA</option>
    <option value="Home">Home</option>
    <option value="Medalert">Medalert</option>
  </select>
</div>

        <button className="refresh-btn" onClick={fetchIntegrations}>
          <i className="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
      </div>

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
                <th>Extension</th>
                <th>Server IP</th>
                <th>Campaign + Model</th>
                <th>Remote Agents</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {filteredIntegrations.map((integration) => (
                <tr
                  key={integration.id}
                  onClick={() => viewDetails(integration)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <strong>{integration.companyName}</strong>

                  </td>
                  <td>
                    {integration.extensions && integration.extensions.length > 0 ? (
                      <div className="extensions-cell admin-extensions-cell" dir="ltr" style={{ direction: 'ltr' }}>
                        {integration.extensions.map((ext, idx) => (
                          <span key={idx} className="extension-badge">{ext}</span>
                        ))}
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    {integration.serverIPs && integration.serverIPs.length > 0 ? (
                      <div className="ips-cell admin-serverips-cell" dir="ltr" style={{ direction: 'ltr' }}>
                        {integration.serverIPs.slice(0, 2).map((ip, idx) => (
                          <span key={idx} className="ip-badge">{ip}</span>
                        ))}
                        {integration.serverIPs.length > 2 && (
                          <span className="more-badge">+{integration.serverIPs.length - 2}</span>
                        )}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {integration.campaign && integration.model ? (
                      <div className="campaign-model-cell">
                        <span className="campaign-badge">
                          {integration.campaign} {integration.model}
                        </span>
                      </div>
                    ) : (
                      <span className="legacy-badge">Legacy</span>
                    )}
                  </td>
                  <td>{integration.numberOfBots || '-'}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(integration.status)}`}>
                      {getStatusLabel(integration.status)}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedIntegration && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Integration Request Details</h2>
              <button className="close-modal-btn" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body simple-form">


              <div className="form-section">
                <h3>Company Name</h3>
                <div className="form-row">
                  <EditableField
                    field="companyName"
                    value={selectedIntegration.companyName}

                  />
                </div>
              </div>

              {selectedIntegration.campaign && (
                <div className="form-section">
                  <h3>Campaign Configuration</h3>
                  <div className="form-row">
                    <EditableField
                      field="clientsdata_id"
                      value={selectedIntegration.clientsdata_id}
                      label="Client ID"
                    />
                    <EditableField
                      field="campaign"
                      value={selectedIntegration.campaign}
                      label="Campaign Type"
                      options={Object.keys(campaignConfig)}
                    />
                  </div>
                  <div className="form-row">
                    <EditableField
                      field="model"
                      value={selectedIntegration.model}
                      label="Bot Model"
                      options={campaignConfig[selectedIntegration.campaign] || []}
                    />
                    <EditableField
                      field="numberOfBots"
                      value={selectedIntegration.numberOfBots}
                      label="Number of Bots"
                      type="number"
                    />
                  </div>
                  <div className="form-row">
                    <EditableField
                      field="dialplan"
                      value={selectedIntegration.dialplan}
                      label="Dialplan"
                    />
                    <EditableField
                      field="transferSettings"
                      value={selectedIntegration.transferSettings}
                      label="Transfer Settings"
                      options={
                        selectedIntegration.model === 'Basic'
                          ? basicTransferOptions
                          : advancedTransferOptions
                      }
                    />
                  </div>
                  <div className="form-row full admin-extensions-row" dir="ltr" style={{ direction: 'ltr' }}>
                    <EditableArrayField
                      field="extensions"
                      value={selectedIntegration.extensions}
                      label="Extensions"
                    />
                  </div>
                  <div className="form-row full admin-serverips-row" dir="ltr" style={{ direction: 'ltr' }}>
                    <EditableArrayField
                      field="serverIPs"
                      value={selectedIntegration.serverIPs}
                      label="Server IPs"
                    />
                  </div>
                </div>
              )}

              <div className="form-section">
                <h3>Primary Dialler</h3>
                <div className="form-row">
                  <EditableField
                    field="primaryUser"
                    value={selectedIntegration.primaryUser}
                    label="Username"
                  />
                  <EditableField
                    field="primaryPassword"
                    value={selectedIntegration.primaryPassword}
                    label="Password"
                  />
                </div>
                <div className="form-row">
                  <EditableField
                    field="primaryPort"
                    value={selectedIntegration.primaryPort}
                    label="Port"
                  />
                  <EditableField
                    field="primaryBotsCampaign"
                    value={selectedIntegration.primaryBotsCampaign}
                    label="Fronting Campaign"
                  />
                </div>
                <div className="form-row">
                  <EditableField
                    field="primaryUserSeries"
                    value={selectedIntegration.primaryUserSeries}
                    label="Verifier Campaign"
                  />
                </div>
                <div className="form-row full">
                  <EditableLinkField
                    field="primaryIpValidation"
                    value={selectedIntegration.primaryIpValidation}
                    label="IP Validation Link"
                  />
                </div>
                <div className="form-row full">
                  <EditableLinkField
                    field="primaryAdminLink"
                    value={selectedIntegration.primaryAdminLink}
                    label="Admin Link"
                  />
                </div>
              </div>

              {selectedIntegration.setupType === 'separate' && (
                <div className="form-section">
                  <h3>Closer Dialler</h3>
                  <div className="form-row">
                    <EditableField
                      field="closerUser"
                      value={selectedIntegration.closerUser}
                      label="Username"
                    />
                    <EditableField
                      field="closerPassword"
                      value={selectedIntegration.closerPassword}
                      label="Password"
                    />
                  </div>
                  <div className="form-row">
                    <EditableField
                      field="closerPort"
                      value={selectedIntegration.closerPort}
                      label="Port"
                    />
                    <EditableField
                      field="closerCampaign"
                      value={selectedIntegration.closerCampaign}
                      label="Campaign"
                    />
                  </div>
                  <div className="form-row">
                    <EditableField
                      field="closerIngroup"
                      value={selectedIntegration.closerIngroup}
                      label="Ingroup"
                    />
                  </div>
                  <div className="form-row full">
                    <EditableLinkField
                      field="closerIpValidation"
                      value={selectedIntegration.closerIpValidation}
                      label="IP Validation Link"
                    />
                  </div>
                  <div className="form-row full">
                    <EditableLinkField
                      field="closerAdminLink"
                      value={selectedIntegration.closerAdminLink}
                      label="Admin Link"
                    />
                  </div>
                </div>
              )}

              <div className="form-section">
                <h3>Notes</h3>
                <EditableField
                  field="customRequirements"
                  value={selectedIntegration.customRequirements}
                  label="Current Bots / Notes"
                  isTextarea={true}
                />
              </div>

              {selectedIntegration.campaign && (
                <div className="form-section">
                  <h3>Time Duration</h3>
                  <div className="form-row">
                    <EditableField
                      field="startDate"
                      value={formatDateForInput(selectedIntegration.startDate)}
                      label="Start Date"
                      type="date"
                    />
                    <EditableField
                      field="endDate"
                      value={formatDateForInput(selectedIntegration.endDate)}
                      label="End Date"
                      type="date"
                    />
                  </div>
                  {selectedIntegration.endDate && (
                    <div className="duration-info">
                      <p>
                        <i className="bi bi-calendar-range"></i>
                        Campaign will expire on {formatDate(selectedIntegration.endDate)}
                      </p>
                    </div>
                  )}
                </div>
              )}


              <div className="form-section">
                <h3>Status & Requirements</h3>

                <div className="completion-requirements">
                  <div className="requirement-header">
                    <p><strong>Mark complete before setting to "Completed" status:</strong></p>
                  </div>
                  <div className="requirements-grid">
                    <label className="requirement-checkbox">
                      <input
                        type="checkbox"
                        checked={completionChecks.longScript}
                        onChange={(e) => updateCompletionCheck('longScript', e.target.checked)}
                      />
                      <span>Long Script</span>
                      {selectedIntegration.campaignResources?.longScript && (
                        <i className="bi bi-check-circle-fill text-success" title="Added"></i>
                      )}
                    </label>

                    <label className="requirement-checkbox">
                      <input
                        type="checkbox"
                        checked={completionChecks.clientDashboard}
                        onChange={(e) => updateCompletionCheck('clientDashboard', e.target.checked)}
                      />
                      <span>Client Dashboard</span>
                      {selectedIntegration.campaignResources?.clientDashboard && (
                        <i className="bi bi-check-circle-fill text-success" title="Added"></i>
                      )}
                    </label>

                    <label className="requirement-checkbox">
                      <input
                        type="checkbox"
                        checked={completionChecks.disposition}
                        onChange={(e) => updateCompletionCheck('disposition', e.target.checked)}
                      />
                      <span>Disposition</span>
                      {selectedIntegration.campaignResources?.disposition && (
                        <i className="bi bi-check-circle-fill text-success" title="Added"></i>
                      )}
                    </label>
                  </div>

                  <button
                    className="manage-resources-btn"
                    onClick={openResourceModal}
                  >
                    <i className="bi bi-gear"></i> Manage Campaign Resources
                  </button>
                </div>

                <div className="status-selector">
                  <label>Update Status:</label>
                  <select
                    value={selectedIntegration.status}
                    onChange={(e) => updateStatus(selectedIntegration.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="pending">Pending</option>
  <option value="in-progress">In Progress</option>
  <option value="onboarded">Onboarded</option>
  <option value="testing">Testing</option>
  <option value="testing-failed">Testing Failed</option>
  <option value="paused">Paused</option>
  <option value="offboarded">Offboarded</option>
  <option value="cancelled">Cancelled</option>
                  </select>
                  {!allCompletionChecksMet() && selectedIntegration.status !== 'onboarded' && (
                    <small className="warning-text">
                      ⚠️ All requirements must be checked before marking as onboarded
                    </small>
                  )}
                </div>

                <div className="status-history-section" style={{ marginTop: '24px' }}>
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '16px' 
  }}>
    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
      <i className="bi bi-clock-history"></i> Status History
    </h4>
    <button
      className="toggle-history-btn"
      onClick={() => setShowStatusHistory(!showStatusHistory)}
      style={{
        padding: '6px 12px',
        fontSize: '14px',
        color: '#4f46e5',
        background: 'transparent',
        border: '1px solid #4f46e5',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = '#eef2ff';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <i className={`bi bi-chevron-${showStatusHistory ? 'up' : 'down'}`}></i>
      {showStatusHistory ? 'Hide' : 'Show'} History
    </button>
  </div>
  
  {showStatusHistory && (
    <StatusHistoryTimeline 
      history={selectedIntegration.statusHistory || []} 
      onDelete={deleteStatusHistoryEntry}
    />
  )}
</div>
              </div>

              <div style={{
                padding: '16px 0',
                borderTop: '1px solid #e5e7eb',
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <strong>Submitted:</strong> {formatDate(selectedIntegration.submittedAt)}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <strong>Last Updated:</strong> {formatDate(selectedIntegration.updatedAt)}
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="edit-toggle-btn"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <i className={`bi bi-${isEditMode ? 'x' : 'pencil'}`}></i>
                {isEditMode ? 'Done Editing' : 'Edit Details'}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteIntegration(selectedIntegration.id)}
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

      {showResourceModal && selectedIntegration && (
        <div className="modal-overlay" onClick={() => setShowResourceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Campaign Resources</h2>
              <button className="close-modal-btn" onClick={() => setShowResourceModal(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="resource-form">
                <div className="form-group">
                  <label htmlFor="longScript">
                    <i className="bi bi-file-text"></i> Long Script URL
                  </label>
                  <input
                    type="url"
                    id="longScript"
                    value={campaignResources.longScript}
                    onChange={(e) => setCampaignResources({
                      ...campaignResources,
                      longScript: e.target.value
                    })}
                    placeholder="https://example.com/long-script"
                  />
                  <small>Enter the URL for the long script document</small>
                </div>

                <div className="form-group">
                  <label htmlFor="clientDashboard">
                    <i className="bi bi-speedometer2"></i> Client Dashboard URL
                  </label>
                  <input
                    type="url"
                    id="clientDashboard"
                    value={campaignResources.clientDashboard}
                    onChange={(e) => setCampaignResources({
                      ...campaignResources,
                      clientDashboard: e.target.value
                    })}
                    placeholder="https://example.com/dashboard"
                  />
                  <small>Enter the URL for the client dashboard</small>
                </div>

                <div className="form-group">
                  <label htmlFor="disposition">
                    <i className="bi bi-list-check"></i> Disposition URL
                  </label>
                  <input
                    type="url"
                    id="disposition"
                    value={campaignResources.disposition}
                    onChange={(e) => setCampaignResources({
                      ...campaignResources,
                      disposition: e.target.value
                    })}
                    placeholder="https://example.com/disposition"
                  />
                  <small>Enter the URL for the disposition document</small>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowResourceModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveCampaignResources}>
                <i className="bi bi-check-lg"></i> Save Resources
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );

};


export default AdminDashboard;