import React, { useState, useEffect } from 'react';
import api from '../api';
import { Trash2, Edit } from 'lucide-react';

function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ quote: '', author: '', role: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => { const res = await api.get('/testimonials'); setItems(res.data); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    if (editingId) await api.put(`/testimonials/${editingId}`, data);
    else await api.post('/testimonials', data);

    setEditingId(null);
    setFormData({ quote: '', author: '', role: '' });
    setImageFile(null);
    fetchItems();
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Client Testimonials</h1>
        <p className="section-subtitle">Manage customer feedback to build trust and social proof.</p>
      </div>

      <div className="card">
        <h3 className="form-title">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          <div className="form-group">
            <label>Author / Client Name</label>
            <input placeholder="e.g. John Doe" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Role / Position</label>
            <input placeholder="e.g. Technical Director" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
          </div>
          <div className="form-group full">
            <label>Testimonial Quote</label>
            <textarea rows={3} placeholder="Paste the client's words here..." value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} />
          </div>
          <div className="form-group full">
            <label>Client Photo</label>
            <div className="file-input-wrapper">
              <input type="file" onChange={e => setImageFile(e.target.files[0])} />
            </div>
          </div>
          <div className="form-actions" style={{gridColumn: 'span 2'}}>
            <button type="submit" className="btn btn-primary">Save Testimonial</button>
            {editingId && <button type="button" onClick={() => setEditingId(null)} className="btn btn-ghost" style={{marginLeft: 12}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="items-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <img src={item.img || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"} className="item-preview" alt={item.author} />
            <div className="item-content">
              <p className="item-desc" style={{fontStyle: 'italic'}}>"{item.quote}"</p>
              <h5 className="item-title">{item.author}</h5>
              <p className="item-subtitle" style={{color: '#64748b', fontSize: '0.85rem', marginBottom: 20}}>{item.role}</p>
              <div className="item-footer">
                <button 
                  onClick={() => { setEditingId(item._id); setFormData({ quote: item.quote, author: item.author, role: item.role }); }} 
                  className="btn btn-ghost"
                  style={{flex: 1}}
                >
                  <Edit size={16} /> Edit
                </button>
                <button onClick={async () => { await api.delete(`/testimonials/${item._id}`); fetchItems(); }} className="btn btn-danger">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsManager;
