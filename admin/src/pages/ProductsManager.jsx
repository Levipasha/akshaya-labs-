import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import ImageCropperModal from '../components/ImageCropperModal';

function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', description: '', category: '', img: '',
    material: 'High-grade Industrial Composite',
    warranty: '12 Months Support',
    availability: 'Ready for Dispatch'
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Cropper State
  const [tempImage, setTempImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
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
    const file = new File([blob], "product-cropped.jpg", { type: "image/jpeg" });
    setImageFile(file);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('material', formData.material);
      data.append('warranty', formData.warranty);
      data.append('availability', formData.availability);
      data.append('img', formData.img);
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await api.put(`/products/${editingId}`, data);
        alert('Product updated successfully!');
      } else {
        await api.post('/products', data);
        alert('Product created successfully!');
      }
      
      setEditingId(null);
      setFormData({ name: '', description: '', category: '', img: '', material: 'High-grade Industrial Composite', warranty: '12 Months Support', availability: 'Ready for Dispatch' });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Products Management</h1>
        <p className="section-subtitle">Add, edit or remove products from your catalog.</p>
      </div>

      <div className="card">
        <h3 className="form-title">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              placeholder="e.g. Laminar Flow Cabinet"
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
              className="form-control"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Material</label>
            <input 
              type="text" 
              value={formData.material} 
              onChange={e => setFormData({...formData, material: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Warranty</label>
            <input 
              type="text" 
              value={formData.warranty} 
              onChange={e => setFormData({...formData, warranty: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Availability</label>
            <input 
              type="text" 
              value={formData.availability} 
              onChange={e => setFormData({...formData, availability: e.target.value})} 
            />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea 
              placeholder="Provide a detailed description of the product..."
              rows={3}
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div className="form-group full">
            <label>Product Image</label>
            <div className="file-input-wrapper">
              <input type="file" onChange={onFileChange} />
              {imageFile && <p style={{color: '#10b981', fontWeight: 600, marginTop: 8}}>✓ Image Cropped Successfully</p>}
              <p style={{fontSize: '0.85rem', color: '#64748b', marginTop: 8}}>Upload a high-quality JPEG or PNG image</p>
            </div>
          </div>
          <div className="form-actions" style={{gridColumn: 'span 2', display: 'flex', gap: 12}}>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Product' : 'Create Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({name:'', description:'', category:'', material: 'High-grade Industrial Composite', warranty: '12 Months Support', availability: 'Ready for Dispatch'}); }} className="btn btn-ghost">Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="items-grid">
        {products.map(p => (
          <div key={p._id} className="item-card">
            <img src={p.img} alt={p.name} className="item-preview" />
            <div className="item-content">
              <h4 className="item-title">{p.name}</h4>
              <p className="item-desc">{p.description}</p>
              <div className="item-footer">
                <button 
                  onClick={() => {
                    setEditingId(p._id);
                    setFormData({ 
                      name: p.name, 
                      description: p.description, 
                      category: p.category || '', 
                      img: p.img,
                      material: p.material || 'High-grade Industrial Composite',
                      warranty: p.warranty || '12 Months Support',
                      availability: p.availability || 'Ready for Dispatch'
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="btn btn-ghost"
                  style={{flex: 1}}
                >
                  <Edit size={16} /> Edit
                </button>
                <button 
                  onClick={() => deleteProduct(p._id)} 
                  className="btn btn-danger"
                >
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
          aspectRatio={4 / 3}
        />
      )}
    </div>
  );
}

export default ProductsManager;
