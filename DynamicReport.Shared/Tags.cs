using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamicReport.Shared;

[Table("TAGS")]
public class Tags
{
    [Key]
    public int ID { get; set; }
    public string? Name { get; set; }
}
