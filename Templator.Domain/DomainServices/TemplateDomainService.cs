using Templator.Domain.Interfaces;
using System.Text.RegularExpressions;

namespace Templator.Domain.DomainServices;

public partial class TemplateDomainService : ITemplateDomainService
{
    private static readonly Regex PlaceholderRegex = MyRegex();
    
    public IEnumerable<string> ExtractPlaceholders(string html)
    {
        var matches = PlaceholderRegex.Matches(html);
        return matches
            .Select(m => m.Groups[1].Value)
            .Distinct();
    }

    public bool ValidateData(Dictionary<string, string> data, IEnumerable<string> placeholders, out IEnumerable<string> errors)
    {
        var missingKeys = placeholders.Where(ph => !data.ContainsKey(ph) || string.IsNullOrEmpty(data[ph])).ToList();

        if (missingKeys.Count != 0)
        {
            errors = missingKeys.Select(k => "Missing value for the placeholder '" + k + "'");
            return false;
        }
        
        errors = [];
        return true;
    }

    public string ReplacePlaceholders(string html, Dictionary<string, string> data)
    {
        var result = PlaceholderRegex.Replace(html, match =>
        {
            var key = match.Groups[1].Value;
            return data.TryGetValue(key, out var value) ? value ?? string.Empty : string.Empty;
        });
        return result;
    }

    [GeneratedRegex(@"\{\{\s*(\w+)\s*\}\}")]
    private static partial Regex MyRegex();
}