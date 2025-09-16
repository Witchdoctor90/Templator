namespace Templator.Domain.Interfaces;

public interface ITemplateDomainService
{
    IEnumerable<string> ExtractPlaceholders(string html);
    
    bool ValidateData(Dictionary<string, string> data, IEnumerable<string> placeholders, out IEnumerable<string> errors);
    
    string ReplacePlaceholders(string html, Dictionary<string, string> data);
}