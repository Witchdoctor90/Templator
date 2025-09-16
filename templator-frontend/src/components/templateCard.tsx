import React from 'react';
import { Template } from '../models/template';
import { deleteTemplate, updateTemplate } from '../services/templateService';

interface TemplateCardProps {
    template: Template;
    onDelete: (id: number) => void;
    onEdit: (template: Template) => void;
    onClick: (template: Template) => void; // функція для кліку
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDelete, onClick, onEdit }) => {
    return (
        <div
        onClick={() => onClick(template)}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                width: 200,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            <h3>{template.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: template.htmlContent }} />
            <button
                style={{
                    marginTop: 'auto',
                    padding: '8px',
                    color: '#000',
                    border: '1px, solid, #000',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                
                onClick={(e) => {e.stopPropagation(); onEdit(template)}}
            >
                Редагувати
            </button>
            <button
                style={{
                    marginTop: 'auto',
                    padding: '8px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                
                onClick={(e) => {e.stopPropagation(); onDelete(template.id)}}
            >
                Видалити
            </button>
        </div>
    );
};

export default TemplateCard;
