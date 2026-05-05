import React, { useState, useEffect } from 'react';
import api from '../api';
import { Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import ImageCropperModal from '../components/ImageCropperModal';

function HeroManager() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ text1: '', text2: '', text3: '', subtext: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Cropper State
  const [tempImage, setTempImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await api.get('/hero');
    setItems(res.data);
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
    const file = new File([blob], "hero-cropped.jpg", { type: "image/jpeg" });
    setImageFile(file);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append('text', JSON.stringify([formData.text1, formData.text2, formData.text3].filter(Boolean)));
      data.append('subtext', formData.subtext);
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await api.put(`/hero/${editingId}`, data);
        alert('Slide updated successfully!');
      } else {
        await api.post('/hero', data);
        alert('Slide added successfully!');
      }
      
      setEditingId(null);
      setFormData({ text1: '', text2: '', text3: '', subtext: '' });
      setImageFile(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Error saving hero slide. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Hero Slideshow</h1>
        <p className="section-subtitle">Manage the high-impact slides on your homepage hero section.</p>
      </div>

      <div className="card">
        <h3 className="form-title">{editingId ? 'Edit Slide' : 'Add New Slide'}</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          <div className="form-group">
            <label>Heading Line 1</label>
            <input placeholder="e.g. INNOVATING" value={formData.text1} onChange={e => setFormData({...formData, text1: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Heading Line 2</label>
            <input placeholder="e.g. AKSHAYA LAB" value={formData.text2} onChange={e => setFormData({...formData, text2: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Heading Line 3 (Optional)</label>
            <input placeholder="e.g. TECHNOLOGIES" value={formData.text3} onChange={e => setFormData({...formData, text3: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Subtext / Description</label>
            <textarea placeholder="e.g. fume hood lab funiture..." value={formData.subtext} onChange={e => setFormData({...formData, subtext: e.target.value})} />
          </div>
          <div className="form-group full">
            <label>Slide Image</label>
            <div className="file-input-wrapper">
              <input type="file" onChange={onFileChange} />
              {imageFile && <p style={{color: '#10b981', fontWeight: 600, marginTop: 8}}>✓ Image Cropped Successfully</p>}
            </div>
          </div>
          <div className="form-actions" style={{gridColumn: 'span 2'}}>
            <button type="submit" className="btn btn-primary">Save Hero Slide</button>
            {editingId && <button type="button" onClick={() => setEditingId(null)} className="btn btn-ghost" style={{marginLeft: 12}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="items-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <img src={item.img} className="item-preview" alt="Slide Preview" />
            <div className="item-content">
              <h4 className="item-title">{item.text.join(' ')}</h4>
              <p className="item-desc">{item.subtext}</p>
              <div className="item-footer">
                <button 
                  onClick={() => {
                    setEditingId(item._id);
                    setFormData({ text1: item.text[0]||'', text2: item.text[1]||'', text3: item.text[2]||'', subtext: item.subtext });
                  }} 
                  className="btn btn-ghost"
                  style={{flex: 1}}
                >
                  <Edit size={16} /> Edit
                </button>
                <button onClick={async () => { await api.delete(`/hero/${item._id}`); fetchItems(); }} className="btn btn-danger">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCropper && (
        <ImageCropperModal 
          image={tempImage} 
          onCropComplete={handleCropComplete} 
          onCancel={() => setShowCropper(false)} 
          aspectRatio={16 / 9}
        />
      )}
    </div>
  );
}

export default HeroManager;
