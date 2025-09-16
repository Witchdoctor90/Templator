using PuppeteerSharp;
using PuppeteerSharp.Media;
using Templator.Application.Interfaces;

namespace Templator.Infrastructure;

public class PdfGenerator : IPdfGenerator
{

    public async Task<byte[]> GeneratePdfAsync(string html)
    {
        var browserFetcher = new BrowserFetcher();
        var revisionInfo = await browserFetcher.DownloadAsync();

        var launchOptions = new LaunchOptions
        {
            Headless = true,
            ExecutablePath = revisionInfo.GetExecutablePath()
        };

        await using var browser = await Puppeteer.LaunchAsync(launchOptions);
        await using var page = await browser.NewPageAsync();

        await page.SetContentAsync(html);
        
        var pdfData = await page.PdfDataAsync(new PdfOptions
        {
            Format = PaperFormat.A4,
            PrintBackground = true
        });

        return pdfData;
    }
}