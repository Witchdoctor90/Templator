using Microsoft.EntityFrameworkCore;
using Templator.Domain;

namespace Templator.Infrastructure.DB;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Template> Templates { get; set; }
}