import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (val) => {
    setUsername(val);
    if (error) setError('');
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use .trim() to avoid issues with accidental spaces
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      onLogin();
    } else {
      setError('Invalid ID or Password');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <Lock size={32} />
          </div>
          <h1>Admin Portal</h1>
          <p>Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="login-group">
            <label>Admin ID</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Enter ID" 
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="login-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password" 
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Login to Dashboard
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 Akshaya Lab Technologies</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
