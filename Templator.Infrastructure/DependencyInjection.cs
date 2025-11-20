using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Templator.Application.Interfaces;
using Templator.Application.Services;
using Templator.Domain;
using Templator.Domain.DomainServices;
using Templator.Domain.Interfaces;
using Templator.Infrastructure.DB;

namespace Templator.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(opts =>
            opts.UseNpgsql(configuration.GetConnectionString("DBConnection"),
                sqloptions => sqloptions.MigrationsAssembly("Templator.Infrastructure")));
        //domain
        services.AddScoped<ITemplateDomainService,  TemplateDomainService>();
        //application
        services.AddScoped<IRepository<Template>, TemplateRepository>();
        services.AddScoped<IPdfGenerator, PdfGenerator>();
        services.AddScoped<ITemplateManager, TemplateManager>();
        
        return services;
    }
}