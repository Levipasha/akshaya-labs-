import React, { useState, useEffect } from 'react';
import api from '../api';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import ImageCropperModal from '../components/ImageCropperModal';

function PartnersManager() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  // Cropper State
  const [tempImage, setTempImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => { fetchPartners(); }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await api.get('/partners');
      setPartners(res.data || []);
    } catch (err) {
      console.error("Error fetching partners:", err);
      // alert('Failed to load partners. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (blob) => {
    const file = new File([blob], "partner-logo.jpg", { type: "image/jpeg" });
    setImageFile(file);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageFile) return alert('Please enter partner name and select a logo');

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', name);
      data.append('image', imageFile);

      await api.post('/partners', data);
      
      setName('');
      setImageFile(null);
      alert('Partner added successfully!');
      fetchPartners();
    } catch (err) {
      console.error("Error adding partner:", err);
      const serverMsg = err.response?.data?.message || 'Server did not provide details.';
      alert(`Failed to add partner.\nError: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const deletePartner = async (id) => {
    if (window.confirm('Remove this partner?')) {
      try {
        await api.delete(`/partners/${id}`);
        fetchPartners();
      } catch (err) {
        alert('Failed to delete partner.');
      }
    }
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Brand Partners</h1>
        <p className="section-subtitle">Manage the logo ticker displayed on your home page.</p>
      </div>

      <div className="card">
        <h3 className="form-title">Add New Partner Logo</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          <div className="form-group">
            <label>Partner Name</label>
            <input 
              placeholder="e.g. Research Lab Inc." 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Brand Logo</label>
            <div className="file-input-wrapper">
              <input type="file" onChange={onFileChange} />
              {imageFile && <p style={{color: '#10b981', fontWeight: 600, marginTop: 10}}>✓ Logo Selected & Cropped</p>}
              {!imageFile && <p style={{color: '#64748b', fontSize: '0.9rem', marginTop: 10}}>Upload partner icon/logo</p>}
            </div>
          </div>
          <div className="form-actions" style={{gridColumn: 'span 2'}}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Plus size={18} /> Add Partner
            </button>
          </div>
        </form>
      </div>

      <div className="items-grid">
        {loading && partners.length === 0 && <p>Loading partners...</p>}
        {!loading && partners.length === 0 && <p>No partners added yet.</p>}
        {partners.map(p => (
          <div key={p._id} className="item-card" style={{display: 'flex', alignItems: 'center', padding: '12px 20px'}}>
            <div style={{width: 60, height: 60, background: '#f8fafc', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
               <img src={p.img} alt={p.name} style={{maxWidth: '80%', maxHeight: '80%', objectFit: 'contain'}} />
            </div>
            <div style={{flex: 1}}>
              <h4 className="item-title" style={{marginBottom: 0}}>{p.name}</h4>
            </div>
            <button onClick={() => deletePartner(p._id)} className="btn btn-danger" style={{padding: '8px 12px'}}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {showCropper && (
        <ImageCropperModal 
          image={tempImage} 
          onCropComplete={handleCropComplete} 
          onCancel={() => setShowCropper(false)} 
          aspectRatio={1} // Partners logos are usually square or centered
        />
      )}
    </div>
  );
}

export default PartnersManager;
