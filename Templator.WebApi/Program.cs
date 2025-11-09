using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Templator.Infrastructure;
using Templator.Infrastructure.DB;
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
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "AllowFrontend",
                policy =>
                {
                    policy.WithOrigins("http://templator.frontend:80")  
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });
        
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
        app.UseCors("AllowFrontend");
        app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
        
        using(var scope = app.Services.CreateScope())
        {
            var dbcontext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            dbcontext.Database.Migrate();
        }
        
        app.Run();
    }
}