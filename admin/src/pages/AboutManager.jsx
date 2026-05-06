import React, { useState, useEffect, useRef } from 'react';
import { Save, AlertCircle, CheckCircle2, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import api from '../api';
import '../index.css';

const AboutManager = () => {
  const [data, setData] = useState({
    story: { title: '', paragraphs: [''], image: '' },
    stats: [],
    facts: [],
    statutoryProfile: { banker: '', gstNo: '' },
    vendorBase: '',
    whyUs: []
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await api.get('/about');
      if (res.data) {
        // Ensure arrays and objects exist to avoid undefined errors
        setData({
          ...res.data,
          story: {
            title: res.data.story?.title || 'Our Journey & Excellence',
            paragraphs: res.data.story?.paragraphs?.length ? res.data.story.paragraphs : [''],
            image: res.data.story?.image || ''
          },
          stats: res.data.stats || [],
          facts: res.data.facts || [],
          statutoryProfile: res.data.statutoryProfile || { banker: '', gstNo: '' },
          vendorBase: res.data.vendorBase || '',
          whyUs: res.data.whyUs || []
        });
      } else {
        // Defaults
        setData({
          story: { title: 'Our Journey & Excellence', paragraphs: [''], image: '' },
          stats: [{ label: '', value: '', icon: 'Calendar' }],
          facts: [{ label: '', value: '' }],
          statutoryProfile: { banker: '', gstNo: '' },
          vendorBase: '',
          whyUs: ['']
        });
      }
    } catch (err) {
      setError('Failed to fetch about data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const formData = new FormData();
      formData.append('storyTitle', data.story.title);
      formData.append('storyParagraphs', JSON.stringify(data.story.paragraphs.filter(p => p.trim())));
      formData.append('stats', JSON.stringify(data.stats));
      formData.append('facts', JSON.stringify(data.facts));
      formData.append('statutoryProfile', JSON.stringify(data.statutoryProfile));
      formData.append('vendorBase', data.vendorBase);
      formData.append('whyUs', JSON.stringify(data.whyUs.filter(w => w.trim())));
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (data.story.image) {
        formData.append('image', data.story.image);
      }

      const res = await api.post('/about', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setData({
        ...res.data,
        story: {
          title: res.data.story?.title || 'Our Journey & Excellence',
          paragraphs: res.data.story?.paragraphs?.length ? res.data.story.paragraphs : [''],
          image: res.data.story?.image || ''
        },
        stats: res.data.stats || [],
        facts: res.data.facts || [],
        statutoryProfile: res.data.statutoryProfile || { banker: '', gstNo: '' },
        vendorBase: res.data.vendorBase || '',
        whyUs: res.data.whyUs || []
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      setSuccess('About Section saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleStoryParagraphChange = (index, value) => {
    const newParagraphs = [...data.story.paragraphs];
    newParagraphs[index] = value;
    setData({ ...data, story: { ...data.story, paragraphs: newParagraphs } });
  };
  const addStoryParagraph = () => setData({ ...data, story: { ...data.story, paragraphs: [...data.story.paragraphs, ''] } });
  const removeStoryParagraph = (index) => setData({ ...data, story: { ...data.story, paragraphs: data.story.paragraphs.filter((_, i) => i !== index) } });

  const handleStatChange = (index, field, value) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({ ...data, stats: newStats });
  };
  const addStat = () => setData({ ...data, stats: [...data.stats, { label: '', value: '', icon: 'Calendar' }] });
  const removeStat = (index) => setData({ ...data, stats: data.stats.filter((_, i) => i !== index) });

  const handleFactChange = (index, field, value) => {
    const newFacts = [...data.facts];
    newFacts[index] = { ...newFacts[index], [field]: value };
    setData({ ...data, facts: newFacts });
  };
  const addFact = () => setData({ ...data, facts: [...data.facts, { label: '', value: '' }] });
  const removeFact = (index) => setData({ ...data, facts: data.facts.filter((_, i) => i !== index) });

  const handleWhyUsChange = (index, value) => {
    const newWhyUs = [...data.whyUs];
    newWhyUs[index] = value;
    setData({ ...data, whyUs: newWhyUs });
  };
  const addWhyUs = () => setData({ ...data, whyUs: [...data.whyUs, ''] });
  const removeWhyUs = (index) => setData({ ...data, whyUs: data.whyUs.filter((_, i) => i !== index) });

  if (loading) return <div className="card"><div style={{ textAlign: 'center', padding: '2rem' }}>Loading data...</div></div>;

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card-header">
        <h2 className="card-title">Manage About Page</h2>
        <p style={{color: 'var(--text-secondary)'}}>Edit the content of the About Us page.</p>
      </div>

      {error && <div className="alert error"><AlertCircle size={20} /><span>{error}</span></div>}
      {success && <div className="alert success"><CheckCircle2 size={20} /><span>{success}</span></div>}

      {/* Story Section */}
      <h3 style={{ marginTop: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Story Section</h3>
      <div className="form-group">
        <label className="form-label">Story Title</label>
        <input type="text" value={data.story.title || ''} onChange={(e) => setData({ ...data, story: { ...data.story, title: e.target.value } })} className="form-input" />
      </div>

      <div className="form-group">
        <label className="form-label">Story Paragraphs</label>
        {data.story.paragraphs.map((p, index) => (
          <div key={index} className="dynamic-row">
            <textarea value={p} onChange={(e) => handleStoryParagraphChange(index, e.target.value)} className="form-input" rows="3" />
            <button onClick={() => removeStoryParagraph(index)} className="btn btn-danger" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={addStoryParagraph} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}><Plus size={16} /> Add Paragraph</button>
      </div>

      <div className="form-group">
        <label className="form-label">Story Image</label>
        <div className="image-upload-container" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
          {(previewUrl || data.story.image) ? (
            <img src={previewUrl || data.story.image} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
          ) : (
            <div className="upload-placeholder">
              <ImageIcon size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
              <p>Click to upload image</p>
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
      </div>

      {/* Stats Section */}
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Stats</h3>
      {data.stats.map((stat, index) => (
        <div key={index} className="dynamic-row">
          <input type="text" placeholder="Label" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} className="form-input" />
          <input type="text" placeholder="Value" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} className="form-input" />
          <select value={stat.icon} onChange={(e) => handleStatChange(index, 'icon', e.target.value)} className="form-input" style={{ width: '150px' }}>
            <option value="Calendar">Calendar</option>
            <option value="Users">Users</option>
            <option value="Star">Star</option>
            <option value="Briefcase">Briefcase</option>
            <option value="Award">Award</option>
            <option value="CheckCircle">Check</option>
          </select>
          <button onClick={() => removeStat(index)} className="btn btn-danger" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
        </div>
      ))}
      <button onClick={addStat} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}><Plus size={16} /> Add Stat</button>

      {/* Factsheet Section */}
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Factsheet</h3>
      {data.facts.map((fact, index) => (
        <div key={index} className="dynamic-row">
          <input type="text" placeholder="Label" value={fact.label} onChange={(e) => handleFactChange(index, 'label', e.target.value)} className="form-input" />
          <input type="text" placeholder="Value" value={fact.value} onChange={(e) => handleFactChange(index, 'value', e.target.value)} className="form-input" />
          <button onClick={() => removeFact(index)} className="btn btn-danger" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
        </div>
      ))}
      <button onClick={addFact} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}><Plus size={16} /> Add Fact</button>

      {/* Statutory Profile */}
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Statutory Profile</h3>
      <div className="form-group">
        <label className="form-label">Banker</label>
        <input type="text" value={data.statutoryProfile?.banker || ''} onChange={(e) => setData({ ...data, statutoryProfile: { ...data.statutoryProfile, banker: e.target.value } })} className="form-input" />
      </div>
      <div className="form-group">
        <label className="form-label">GST No.</label>
        <input type="text" value={data.statutoryProfile?.gstNo || ''} onChange={(e) => setData({ ...data, statutoryProfile: { ...data.statutoryProfile, gstNo: e.target.value } })} className="form-input" />
      </div>

      <div className="form-group">
        <label className="form-label">Vendor Base Text</label>
        <textarea value={data.vendorBase || ''} onChange={(e) => setData({ ...data, vendorBase: e.target.value })} className="form-input" rows="4" />
      </div>

      {/* Why Us Section */}
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Why Us List</h3>
      {data.whyUs.map((item, index) => (
        <div key={index} className="dynamic-row">
          <input type="text" value={item} onChange={(e) => handleWhyUsChange(index, e.target.value)} className="form-input" />
          <button onClick={() => removeWhyUs(index)} className="btn btn-danger" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
        </div>
      ))}
      <button onClick={addWhyUs} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}><Plus size={16} /> Add Why Us Item</button>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AboutManager;
