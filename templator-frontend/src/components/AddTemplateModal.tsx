import React, { useState } from 'react';
import { Template } from '../models/template';
import { createTemplate } from '../services/templateService';

interface AddTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (template: Omit<Template, 'id'>) => void;
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Будь ласка, введіть назву шаблону');
      return;
    }
    createTemplate({ name, htmlContent }).then(() => {
      onAdd({ name, htmlContent });
    });
    setName('');
    setHtmlContent('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 8,
        width: 400,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <h2>Додати новий шаблон</h2>
        <input
          type="text"
          placeholder="Назва шаблону"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
          required
        />
        <textarea
          placeholder="HTML контент шаблону"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          rows={6}
          style={{ padding: 8, fontSize: 14, fontFamily: 'monospace' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>
            Скасувати
          </button>
          <button type="submit" style={{ padding: '8px 16px' }}>
            Додати
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTemplateModal;
