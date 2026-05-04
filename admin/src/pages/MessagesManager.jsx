import React, { useState, useEffect } from 'react';
import api from '../api';
import { Trash2, Mail } from 'lucide-react';

function MessagesManager() {
  const [messages, setMessages] = useState([]);

  useEffect(() => { fetchMessages(); }, []);
  const fetchMessages = async () => { const res = await api.get('/contact'); setMessages(res.data); };

  const deleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      await api.delete(`/contact/${id}`);
      fetchMessages();
    }
  };

  return (
    <div className="animate-fade">
      <div className="section-header">
        <h1 className="section-title">Inquiry Messages</h1>
        <p className="section-subtitle">View and manage communications from your website's contact form.</p>
      </div>

      <div className="items-grid">
        {messages.map(m => (
          <div key={m._id} className="card" style={{position: 'relative', overflow: 'hidden'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20}}>
              <div style={{backgroundColor: '#e0f2fe', padding: 12, borderRadius: '16px'}}>
                <Mail size={24} color="#0369a1" />
              </div>
              <div>
                <h4 style={{margin: 0, fontSize: '1.1rem', fontWeight: 700}}>{m.name}</h4>
                <p style={{margin: 0, fontSize: '0.85rem', color: '#64748b'}}>{m.email}</p>
              </div>
            </div>
            
            <div style={{backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px'}}>
              <p style={{fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: '0.9rem'}}>{m.subject || 'No Subject'}</p>
              <p style={{fontSize: '0.85rem', color: '#64748b', marginBottom: 4}}><strong>Company:</strong> {m.company || 'N/A'}</p>
              <p style={{fontSize: '0.85rem', color: '#64748b', marginBottom: 12}}><strong>Phone:</strong> {m.phone || 'Not Provided'}</p>
              <p style={{fontSize: '0.95rem', lineHeight: 1.6, color: '#475569', whiteSpace: 'pre-wrap'}}>{m.message}</p>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <p style={{fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600}}>
                {new Date(m.createdAt).toLocaleDateString()} at {new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              <button 
                onClick={() => deleteMessage(m._id)} 
                className="btn btn-danger" 
                style={{padding: '8px 12px'}}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="card" style={{gridColumn: '1/-1', textAlign: 'center', padding: '60px'}}>
             <Mail size={48} color="#cbd5e1" style={{marginBottom: 16}} />
             <h3>No messages found</h3>
             <p color="#64748b">When users contact you, their messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesManager;
