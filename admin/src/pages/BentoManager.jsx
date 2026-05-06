import React, { useState, useEffect } from 'react';
import api from '../api';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const BentoManager = () => {
  const [bento, setBento] = useState({
    aboutText: '',
    stat1Value: '',
    stat1Label: '',
    stat2Value: '',
    stat2Label: '',
    catalogTitle: '',
    catalogSubtitle: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBento();
  }, []);

  const fetchBento = async () => {
    try {
      const res = await api.get('/bento');
      if (res.data) setBento(res.data);
    } catch (error) {
      console.error('Error fetching bento data:', error);
      setMessage('Error loading data');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBento({ ...bento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError(false);
    try {
      await api.put('/bento', bento);
      setMessage('Bento Grid updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating bento data:', error);
      setMessage('Error updating data');
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="card">
      <div style={{ textAlign: 'center', padding: '2rem' }}>Loading data...</div>
    </div>
  );

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Manage Bento Grid</h1>
        <p className="section-subtitle">Edit the content displayed in the Bento Grid section on the home page.</p>
      </div>
      
      {message && (
        <div className={`alert ${error ? 'error' : 'success'}`} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: error ? '#fee2e2' : '#dcfce7', color: error ? '#b91c1c' : '#15803d' }}>
          {error ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span>{message}</span>
        </div>
      )}

      <div className="card">
        <h3 className="form-title">Edit Bento Grid Content</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          
          {/* About Section */}
          <div className="form-group full">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
              1. About Section (Left Column)
            </h4>
          </div>
          <div className="form-group full">
            <label>About Text</label>
            <textarea 
              name="aboutText" value={bento.aboutText} onChange={handleChange}
              rows="4" required
            />
          </div>

          {/* Stats Section */}
          <div className="form-group full">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              2. Statistics (Top Middle)
            </h4>
          </div>
          <div className="form-group">
            <label>Stat 1 Value (e.g., 200+)</label>
            <input 
              type="text" name="stat1Value" value={bento.stat1Value} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label>Stat 1 Label (e.g., Projects Delivered)</label>
            <input 
              type="text" name="stat1Label" value={bento.stat1Label} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label>Stat 2 Value (e.g., 15+)</label>
            <input 
              type="text" name="stat2Value" value={bento.stat2Value} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label>Stat 2 Label (e.g., Years Experience)</label>
            <input 
              type="text" name="stat2Label" value={bento.stat2Label} onChange={handleChange} required
            />
          </div>

          {/* Catalog Section */}
          <div className="form-group full">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              3. Catalog Box (Bottom Middle)
            </h4>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" name="catalogTitle" value={bento.catalogTitle} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input 
              type="text" name="catalogSubtitle" value={bento.catalogSubtitle} onChange={handleChange} required
            />
          </div>

          <div className="form-actions full" style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Bento Grid Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BentoManager;
