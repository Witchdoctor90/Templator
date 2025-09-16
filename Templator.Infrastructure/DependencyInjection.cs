using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Templator.Application.Interfaces;
using Templator.Infrastructure.DB;

namespace Templator.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(opts =>
            opts.UseSqlServer(configuration.GetConnectionString("DBConnection")));
        services.AddScoped<IPdfGenerator, PdfGenerator>();
        return services;
    }
}