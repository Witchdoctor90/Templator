using Microsoft.AspNetCore.Mvc;
using Templator.Application.Interfaces;
using Templator.Domain;
using Templator.WebApi.DTOs;

namespace Templator.WebApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TemplateController : ControllerBase
{
    private readonly ITemplateManager _templateManager;
    public TemplateController(ITemplateManager templateManager)
    {
        _templateManager = templateManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var templates =  await _templateManager.GetAllAsync();
        return Ok(templates);
    }

    [HttpGet]
    public async Task<IActionResult> Get(int id)
    {
        var template = await _templateManager.GetByIdAsync(id);
        if (template == null) throw new ArgumentException("Template not found");
        return Ok(template);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TemplateCreateDTO data)
    {
        var template = new Template()
        {
            Name = data.Name,
            HtmlContent = data.HtmlContent,
        };
        await _templateManager.AddAsync(template);
        return Ok(template);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Template data)
    {
        var template = await _templateManager.GetByIdAsync(data.Id);
        if (template == null) throw new ArgumentException("Template not found");
        
        await _templateManager.UpdateAsync(data);
        return Ok(template);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var template = await _templateManager.GetByIdAsync(id);
        if (template == null) throw new ArgumentException("Template not found");
        await _templateManager.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> GeneratePdf(int id, [FromBody] Dictionary<string, string> data)
    {
        var pdfBytes = await _templateManager.GeneratePdfAsync(id, data);
        if (pdfBytes == null) throw new ArgumentException("Failed to create PDF file");
        return File(pdfBytes, "application/pdf", $"template_{id}.pdf");
    }
}
