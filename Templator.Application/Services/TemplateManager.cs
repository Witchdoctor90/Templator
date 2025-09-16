using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using Templator.Application.Interfaces;
using Templator.Domain;
using Templator.Domain.Interfaces;

namespace Templator.Application.Services;

public class TemplateManager(
    IRepository<Template> templateRepository,
    ITemplateDomainService _templateDomainService,
    IPdfGenerator pdfGenerator)
    : ITemplateManager
{
    public async Task<IEnumerable<Template>> GetAllAsync()
        {
            return await templateRepository.GetAllAsync();
        }

        public async Task<Template> GetByIdAsync(int id)
        {
            var template = await templateRepository.GetByIdAsync(id);
            if (template == null) throw new KeyNotFoundException($"Template with id {id} not found.");
            return template;
        }

        public async Task AddAsync(Template template)
        {
            await templateRepository.AddAsync(template);
        }

        public async Task UpdateAsync(Template template)
        {
            var existing = await templateRepository.GetByIdAsync(template.Id);
            if (existing == null) throw new KeyNotFoundException($"Template with id {template.Id} not found.");

            existing.Name = template.Name;
            existing.HtmlContent = template.HtmlContent;

            await templateRepository.UpdateAsync(existing);
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await templateRepository.GetByIdAsync(id);
            if (existing == null) throw new KeyNotFoundException($"Template with id {id} not found.");

            await templateRepository.DeleteAsync(id);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await templateRepository.ExistsAsync(id);
        }

        public async Task<IEnumerable<Template>> FindAsync(Expression<Func<Template, bool>> predicate)
        {
            return await templateRepository.FindAsync(predicate);
        }

        public async Task<byte[]> GeneratePdfAsync(int templateId, Dictionary<string, string> data)
        {
            var template = await templateRepository.GetByIdAsync(templateId);
            if (template == null) throw new KeyNotFoundException($"Template with id {templateId} not found.");

            var placeholders = _templateDomainService.ExtractPlaceholders(template.HtmlContent);

            if (!_templateDomainService.ValidateData(data, placeholders, out var errors))
                throw new ValidationException(string.Join("; ", errors));

            var filledHtml = _templateDomainService.ReplacePlaceholders(template.HtmlContent, data);

            var pdfBytes = await pdfGenerator.GeneratePdfAsync(filledHtml);

            return pdfBytes;
        }
    }