import React, { useState, useEffect } from 'react';

interface TemplatePlaceholdersModalProps {
  placeholders: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
}

const TemplatePlaceholdersModal: React.FC<TemplatePlaceholdersModalProps> = ({
  placeholders,
  onClose,
  isOpen,
  onSubmit,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});

  // При зміні плейсхолдерів скидаємо значення
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    placeholders.forEach(ph => {
      initialValues[ph] = '';
    });
    setValues(initialValues);
  }, [placeholders]);

  const handleChange = (key: string, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  if (!isOpen) return null;
  if (placeholders.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 20,
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <h2>Заповнити плейсхолдери</h2>

        {placeholders.map(ph => (
          <div key={ph}>
            <label htmlFor={ph} style={{ display: 'block', marginBottom: 4 }}>
              {ph}:
            </label>
            <input
              id={ph}
              type="text"
              value={values[ph] || ''}
              onChange={e => handleChange(ph, e.target.value)}
              required
              style={{ width: '100%', padding: 8, fontSize: 14 }}
            />
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            marginTop: 20,
          }}
        >
          <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>
            Скасувати
          </button>
          <button type="submit" style={{ padding: '8px 16px' }}>
            Підтвердити
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplatePlaceholdersModal;
