using FluentValidation;
using Templator.Infrastructure;
using Templator.WebApi.Controllers;
using Templator.WebApi.Middleware;


namespace Templator.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddInfrastructure(builder.Configuration);
        builder.Services.AddControllers();
        builder.Services.AddValidatorsFromAssemblyContaining<TemplateDataValidator>();
        
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        var app = builder.Build();

        
        app.UseMiddleware<ErrorHandlingMiddleware>();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
        
        app.Run();
    }
}