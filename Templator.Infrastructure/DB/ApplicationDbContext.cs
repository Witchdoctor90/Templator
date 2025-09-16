using Microsoft.EntityFrameworkCore;
using Templator.Domain;

namespace Templator.Infrastructure.DB;

public class ApplicationDbContext : DbContext
{
    public DbSet<Template> Templates { get; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    {
    }
}