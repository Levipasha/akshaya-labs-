import React, { useState, useEffect } from 'react';
import api from '../api';
import { Trash2, Plus, LayoutGrid, Edit } from 'lucide-react';
import ImageCropperModal from '../components/ImageCropperModal';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [currentImg, setCurrentImg] = useState('');
  
  // Cropper State
  const [tempImage, setTempImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => { fetchCategories(); }, []);
  const fetchCategories = async () => { 
    try {
      setLoading(true);
      const res = await api.get('/categories'); 
      setCategories(res.data || []); 
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { setTempImage(reader.result); setShowCropper(true); };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (blob) => {
    const file = new File([blob], "category-cropped.jpg", { type: "image/jpeg" });
    setImageFile(file);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert('Please enter a category name');
    
    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', name);
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await api.put(`/categories/${editingId}`, data);
      } else {
        await api.post('/categories', data);
      }
      
      setName('');
      setImageFile(null);
      setEditingId(null);
      setCurrentImg('');
      alert(`Category ${editingId ? 'updated' : 'added'} successfully!`);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      const errorMsg = err.response?.data?.message || 'Failed to save category.';
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Delete category?')) {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    }
  };
   
  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setCurrentImg(cat.img);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Category Management</h1>
        <p className="section-subtitle">Manage product categories for your catalog grid.</p>
      </div>

      <div className="card">
        <h3 className="form-title">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
        <form onSubmit={handleSubmit} className="grid-form">
          <div className="form-group">
            <label>Category Name</label>
            <input 
              placeholder="e.g. Laboratory Furniture" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Category Image (Card background)</label>
            <div className="file-input-wrapper">
              {currentImg && !imageFile && <img src={currentImg} style={{width: 80, height: 60, objectFit: 'cover', borderRadius: 8, marginBottom: 10, display: 'block'}} />}
              <input type="file" onChange={onFileChange} />
              {imageFile && <p style={{color: '#10b981', fontWeight: 600, marginTop: 8}}>✓ Image Cropped</p>}
            </div>
          </div>
          <div className="form-actions" style={{gridColumn: 'span 2'}}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {editingId ? 'Update Category' : <><Plus size={18} /> Add Category</>}
            </button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setName(''); setCurrentImg('');}} className="btn btn-ghost" style={{marginLeft: 12}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="items-grid">
        {loading && categories.length === 0 && <p>Loading categories...</p>}
        {categories.map(cat => (
          <div key={cat._id} className="item-card">
            <img src={cat.img} alt={cat.name} className="item-preview" />
            <div className="item-content">
              <h4 className="item-title">{cat.name}</h4>
              <div className="item-footer">
                <button onClick={() => handleEdit(cat)} className="btn btn-ghost" style={{flex: 1}}>
                   <Edit size={16} /> Edit
                </button>
                <button onClick={() => deleteCategory(cat._id)} className="btn btn-danger">
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

export default CategoryManager;
