import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';

// Environment detection
const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5010';
  }
  return 'https://xdialnetworks.com';
};

const API_URL = getApiUrl();

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hard-coded admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'xdial2024'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if it's admin login
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('adminUsername', credentials.username);
      navigate('/admin/dashboard');
      return;
    }

    // Check if it's a client login (numeric username)
    const isNumeric = /^\d+$/.test(credentials.username);
    if (isNumeric) {
      const expectedPassword = `xdial${credentials.username}`;
      
      if (credentials.password === expectedPassword) {
        try {
          // Verify client exists in backend
          const response = await fetch(`${API_URL}/api/client/verify/${credentials.username}`);
          const data = await response.json();

          if (data.success) {
            localStorage.setItem('isClientAuthenticated', 'true');
            localStorage.setItem('clientId', credentials.username);
            navigate('/client/dashboard');
            return;
          } else {
            setError('Client ID not found or not activated');
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error('Error verifying client:', err);
          setError('Failed to verify client credentials');
          setIsLoading(false);
          return;
        }
      }
    }

    // If neither admin nor valid client
    setError('Invalid username or password');
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h1>xDial Networks Login</h1>
            <p>Admin & Client Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">
                <i className="bi bi-person-fill"></i>
                Username / Client ID
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter admin username or client ID"
                required
                autoFocus
              />
              <small className="form-hint">
                Admin: Use your username | Client: Use your Client ID
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="bi bi-lock-fill"></i>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="bi bi-hourglass-split"></i>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  Login
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>© 2024 xDial Networks. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;