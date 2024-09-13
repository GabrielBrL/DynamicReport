using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamicReport.Shared;

[Table("FORM")]
public class Form
{
    [Key]
    public int ID { get; set; }
    public string? Name { get; set; }
    public string? Tag { get; set; }
}