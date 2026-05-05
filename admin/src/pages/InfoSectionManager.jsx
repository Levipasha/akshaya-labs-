import React, { useState, useEffect, useRef } from 'react';
import { Upload, Save, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import '../index.css'; // Adjust import if needed

const InfoSectionManager = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    img: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchInfoSection();
  }, []);

  const fetchInfoSection = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/info-section`);
      if (res.data) {
        setData(res.data);
      } else {
        // Defaults if not exists
        setData({
          title: 'Creating infinite possibilities',
          description: 'We relentlessly innovate to elevate the versatility of steel...',
          img: ''
        });
      }
    } catch (err) {
      setError('Failed to fetch info section data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!data.title || !data.description) {
      setError('Please fill in all required text fields.');
      return;
    }
    if (!data.img && !selectedFile) {
      setError('Please provide an image.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (data.img) {
        formData.append('image', data.img);
      }

      const res = await axios.post(`${API_URL}/info-section`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setData(res.data);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSuccess('Info Section saved successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading data...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Manage Info Section</h2>
        <p style={{color: 'var(--text-secondary)'}}>Edit the "Creating infinite possibilities" section on the Home page.</p>
      </div>

      {error && (
        <div className="alert error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="alert success">
          <CheckCircle2 size={20} />
          <span>{success}</span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Title (Use \n for new lines, although HTML uses br. Just type normally, we can let CSS handle wrapping, or use plain text)</label>
        <textarea
          name="title"
          value={data.title}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g. Creating infinite possibilities"
          rows="2"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g. We relentlessly innovate..."
          rows="4"
        />
      </div>



      <div className="form-group">
        <label className="form-label">Section Image</label>
        <div className="image-upload-container" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
          {(previewUrl || data.img) ? (
            <img 
              src={previewUrl || data.img} 
              alt="Section Preview" 
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
            />
          ) : (
            <div className="upload-placeholder">
              <ImageIcon size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
              <p>Click to upload image</p>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default InfoSectionManager;
