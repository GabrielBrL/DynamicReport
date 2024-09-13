using DynamicReport.Shared;
using Microsoft.EntityFrameworkCore;

namespace DynamicReport.Api.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Form> Forms { get; set; }
    public DbSet<Tags> Tags { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
