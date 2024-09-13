using DynamicReport.Api.Data;
using DynamicReport.Api.IServices;
using DynamicReport.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace DynamicReport.Api;

public static class ConfigureService
{
    public static IServiceCollection AddInfrastrutureServices(this IServiceCollection services, IConfiguration _config)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
        });

        services.AddTransient<IFormService, FormService>();
        services.AddTransient<ITagService, TagService>();

        return services;
    }
}