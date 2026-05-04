import React, { useState, useEffect } from 'react';
import api from '../api';
import { Save } from 'lucide-react';

function FounderManager() {
  const [formData, setFormData] = useState({ name: '', subtitle: '', title: '', text: '', experience: '', projects: '' });
  const [imageFile, setImageFile] = useState(null);
  const [id, setId] = useState(null);
  const [currentImg, setCurrentImg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get('/founder');
    if (res.data) {
      setFormData({
        name: res.data.name,
        subtitle: res.data.subtitle,
        title: res.data.title,
        text: res.data.text,
        experience: res.data.experience,
        projects: res.data.projects
      });
      setId(res.data._id);
      setCurrentImg(res.data.img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (imageFile) data.append('image', imageFile);

      if (id) await api.put(`/founder/${id}`, data);
      else await api.post('/founder', data);
      
      alert('Founder details updated successfully!');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to update founder details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Founder Profile</h1>
        <p className="section-subtitle">Manage the personal bio and credentials of the company founder.</p>
      </div>

      <div className="card">
        <h3 className="form-title">Edit Founder Details</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          <div className="form-group">
            <label>Founder Name</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Subtitle (e.g. Meet Our Founder)</label>
            <input value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
          </div>
          <div className="form-group full">
            <label>Main Headline Title</label>
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="form-group full">
            <label>Biography / Vision Statement</label>
            <textarea rows={4} value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Experience (e.g. 15+ Years)</label>
            <input value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Projects Completed (e.g. 200+)</label>
            <input value={formData.projects} onChange={e => setFormData({...formData, projects: e.target.value})} />
          </div>
          <div className="form-group full">
            <label>Profile Image</label>
            <div className="file-input-wrapper">
              {currentImg && <img src={currentImg} style={{width: 120, height: 120, objectFit: 'cover', display: 'block', margin: '0 auto 15px', borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}} />}
              <input type="file" onChange={e => setImageFile(e.target.files[0])} />
              <p style={{fontSize: '0.85rem', color: '#64748b', marginTop: 10}}>Recommended: Square aspect ratio (1:1)</p>
            </div>
          </div>
          <div className="form-actions" style={{gridColumn: 'span 2'}}>
            <button type="submit" className="btn btn-primary"><Save size={18} /> Update Founder Details</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FounderManager;
