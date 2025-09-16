using System.Linq.Expressions;
using Templator.Domain;

namespace Templator.Application.Interfaces;

public interface IRepository<T>
{
    Task<IEnumerable<Template>> GetAllAsync();
    Task<Template?> GetByIdAsync(int id);
    Task AddAsync(Template template);
    Task UpdateAsync(Template template);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<IEnumerable<Template>> FindAsync(Expression<Func<Template, bool>> predicate);
}