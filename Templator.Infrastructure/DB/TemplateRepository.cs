using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Templator.Application.Interfaces;
using Templator.Domain;

namespace Templator.Infrastructure.DB;

public class TemplateRepository : IRepository<Template>
{
    private readonly ApplicationDbContext _context;
    public TemplateRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public  async Task<IEnumerable<Template>> GetAllAsync()
    {
        return await _context.Templates.ToListAsync();
    }

    public async Task<Template?> GetByIdAsync(int id)
    {
        return await _context.Templates.FindAsync(id);
    }

    public async Task AddAsync(Template template)
    {
        await _context.Templates.AddAsync(template);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Template template)
    {
        _context.Templates.Update(template);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var template = await _context.Templates.FindAsync(id);
        if (_context == null) throw new ArgumentException("Template not found: " + id);
        _context.Templates.Remove(template);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Templates.AnyAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<Template>> FindAsync(Expression<Func<Template, bool>> predicate)
    {
        return await _context.Templates.Where(predicate).ToListAsync();
    }
}