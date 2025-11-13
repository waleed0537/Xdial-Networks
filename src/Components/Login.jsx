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

  // Hard-coded credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'xdial2025'
  };

  const CLIENT_CREDENTIALS = {
    username: 'xdial',
    password: 'xdial2025'
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

    // Check if it's admin credentials
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
      return;
    }

    // Check if it's client credentials
    if (
      credentials.username === CLIENT_CREDENTIALS.username &&
      credentials.password === CLIENT_CREDENTIALS.password
    ) {
      localStorage.setItem('isClientAuthenticated', 'true');
      localStorage.setItem('clientId', 'onboarding');
      navigate('/client/dashboard');
      return;
    }

    // Invalid credentials
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
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                autoFocus
              />
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