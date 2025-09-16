import {Template} from '../models/template';

export const getTemplates = async (): Promise<Template[]> => {
    const response = await fetch('https://localhost:7111/api/Template/GetAll');
    const data = await response.json();
    return data;
}

export const getTemplateById = async (id: number): Promise<Template> => {
    const response = await fetch(`https://localhost:7111/api/Template/Get/${id}`);
    const data = await response.json();
    return data;
}

export const createTemplate = async (templateData: Omit<Template, 'id'>): Promise<Template> => {
    const response = await fetch('https://localhost:7111/api/Template/Create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(templateData),
    });
    if (!response.ok) throw new Error('Помилка при додаванні шаблону');
    return response.json();
};

export const deleteTemplate = async (id: number): Promise<void> => {
    const response = await fetch(`https://localhost:7111/api/Template/Delete/?id=${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Помилка при видаленні шаблону');
};

export const extractPlaceholders = async (template: string): Promise<string[]> => {
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/g;
    const matches = new Set<string>();
    let match;
    while ((match = placeholderRegex.exec(template)) !== null) {
      matches.add(match[1]);
    }
    return Array.from(matches);
  }

  export async function generatePdf(id: number, data: Record<string, string>): Promise<Blob> {
  const response = await fetch(`https://localhost:7111/api/Template/GeneratePdf?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to generate PDF: ${response.statusText}`);
  }
  const pdfBlob = await response.blob();
  return pdfBlob;
}

export const updateTemplate = async (template: Template): Promise<Template> => {
    const response = await fetch('https://localhost:7111/api/Template/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template),
    });
  
    if (!response.ok) {
      throw new Error('Помилка при оновленні шаблону');
    }
  
    return response.json();
  };