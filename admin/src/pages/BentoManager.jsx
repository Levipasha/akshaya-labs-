import React, { useState, useEffect } from 'react';
import api from '../api';

const BentoManager = () => {
  const [bento, setBento] = useState({
    aboutText: '',
    aboutBtnText: '',
    aboutBtnLink: '',
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
    try {
      await api.put('/bento', bento);
      setMessage('Bento Grid updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating bento data:', error);
      setMessage('Error updating data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Bento Grid</h1>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* About Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">1. About Section (Left Column)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">About Text</label>
              <textarea 
                name="aboutText" value={bento.aboutText} onChange={handleChange}
                rows="4" className="w-full border rounded p-2" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input 
                type="text" name="aboutBtnText" value={bento.aboutBtnText} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button Link</label>
              <input 
                type="text" name="aboutBtnLink" value={bento.aboutBtnLink} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">2. Statistics (Top Middle)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stat 1 Value (e.g., 200+)</label>
              <input 
                type="text" name="stat1Value" value={bento.stat1Value} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 1 Label (e.g., Projects Delivered)</label>
              <input 
                type="text" name="stat1Label" value={bento.stat1Label} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 2 Value (e.g., 15+)</label>
              <input 
                type="text" name="stat2Value" value={bento.stat2Value} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 2 Label (e.g., Years Experience)</label>
              <input 
                type="text" name="stat2Label" value={bento.stat2Label} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
          </div>
        </div>


        {/* Catalog Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">3. Catalog Box (Bottom Middle)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text" name="catalogTitle" value={bento.catalogTitle} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input 
                type="text" name="catalogSubtitle" value={bento.catalogSubtitle} onChange={handleChange}
                className="w-full border rounded p-2" required
              />
            </div>
          </div>
        </div>


        <button 
          type="submit" 
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition disabled:bg-blue-400"
        >
          {saving ? 'Saving...' : 'Save Bento Grid Content'}
        </button>
      </form>
    </div>
  );
};

export default BentoManager;
