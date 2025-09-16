import React, { useState, useEffect } from 'react';
import { Template } from '../models/template';
import TemplateCard from '../components/templateCard';
import {
  getTemplates,
  extractPlaceholders,
  deleteTemplate,
  createTemplate,
  updateTemplate,
  generatePdf,
} from '../services/templateService';
import AddTemplateModal from '../components/AddTemplateModal';
import TemplatePlaceholdersModal from '../components/TemplatePlaceholderModal';
import EditTemplateModal from '../components/EditTemplateModal'; // Припустимо, що цей компонент існує

export const HomePage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // Для модалки плейсхолдерів
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [isPlaceholdersModalOpen, setPlaceholdersModalOpen] = useState(false);

  // Для модалки редагування шаблону
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<Template | null>(null);

  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const handleAddTemplate = async (newTemplate: Omit<Template, 'id'>) => {
    const createdTemplate = await createTemplate(newTemplate);
    setTemplates((prev) => [...prev, createdTemplate]);
  };

  const handleDeleteTemplate = async (id: number) => {
    await deleteTemplate(id);
    setTemplates((prev) => prev.filter((template) => template.id !== id));
  };

  const handleCardClick = async (template: Template) => {
    const phs = await extractPlaceholders(template.htmlContent);
    setSelectedTemplateId(template.id);
    setPlaceholders(phs);
    setPlaceholdersModalOpen(true);
  };

  const downloadPdf = async (templateId: number, placeholdersData: Record<string, string>) => {
    try {
      const pdfBlob = await generatePdf(templateId, placeholdersData);
      const url = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `template_${templateId}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      setPlaceholdersModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Обробник кліку на кнопку Редагувати
  const handleEdit = (template: Template) => {
    setTemplateToEdit(template);
    setEditModalOpen(true);
  };

  // Обробник збереження змін у редагуванні
  const handleSaveTemplate = async (updatedTemplate: Template) => {
    try {
      const savedTemplate = await updateTemplate(updatedTemplate);
      setTemplates((prev) =>
        prev.map((t) => (t.id === savedTemplate.id ? savedTemplate : t))
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error('Не вдалось оновити шаблон:', error);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: '40px auto',
        padding: '0 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
      }}
    >
      <h1 style={{ width: '100%', textAlign: 'center', marginBottom: 32 }}>Templator</h1>

      <button
        style={{
          width: '100%',
          maxWidth: 200,
          marginBottom: 24,
          padding: '10px 20px',
          fontSize: 16,
          cursor: 'pointer',
        }}
        onClick={() => setAddModalOpen(true)}
      >
        Додати шаблон
      </button>

      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onDelete={handleDeleteTemplate}
          onClick={handleCardClick}
          onEdit={handleEdit}
        />
      ))}

      <AddTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddTemplate}
      />

      <TemplatePlaceholdersModal
        placeholders={placeholders}
        onClose={() => setPlaceholdersModalOpen(false)}
        isOpen={isPlaceholdersModalOpen}
        onSubmit={(data) => {
          if (selectedTemplateId !== null) {
            downloadPdf(selectedTemplateId, data);
          }
        }}
      />

      {templateToEdit && (
        <EditTemplateModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          template={templateToEdit}
          onSave={handleSaveTemplate}
        />
      )}
    </div>
  );
};
