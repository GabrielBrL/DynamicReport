using DynamicReport.Api.IServices;
using DynamicReport.Api.Services;

namespace DynamicReport.Api;

public static class ConfigureService
{
    public static IServiceCollection AddInfrastrutureServices(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddTransient<IFormService, FormService>();
        services.AddTransient<ITagService, TagService>();

        return services;
    }
}