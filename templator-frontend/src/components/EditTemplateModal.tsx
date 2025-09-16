import React, { useState, useEffect } from 'react';
import { Template } from '../models/template';

interface EditTemplateModalProps {
  isOpen: boolean;
  template: Template | null;
  onClose: () => void;
  onSave: (updatedTemplate: Template) => void;
}

const EditTemplateModal: React.FC<EditTemplateModalProps> = ({ isOpen, template, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (template) {
      setName(template.name);
      setHtmlContent(template.htmlContent);
    }
  }, [template]);

  if (!isOpen || !template) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      ...template,
      name,
      htmlContent,
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 24,
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <h2>Редагування шаблону</h2>

        <label>
          Назва:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        <label>
          HTML контент:
          <textarea
            value={htmlContent}
            onChange={e => setHtmlContent(e.target.value)}
            rows={10}
            style={{ width: '100%', padding: 8, marginTop: 4, fontFamily: 'monospace' }}
            required
          />
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>
            Відмінити
          </button>
          <button type="submit" style={{ padding: '8px 16px' }}>
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTemplateModal;
