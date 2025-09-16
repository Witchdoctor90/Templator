namespace Templator.Application.Interfaces;

public interface IPdfGenerator
{
    public Task<byte[]> GeneratePdfAsync(string html);
}