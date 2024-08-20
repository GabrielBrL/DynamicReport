using DynamicReport.Api.IServices;
using DynamicReport.Shared;

namespace DynamicReport.Api.Services;

public class TagService : ITagService
{
    public List<Tags> GetTags()
    {
        return new(){
            new Tags{
                Name = "Serviços", Qtd = 12
            },
            new Tags{
                Name = "Serviços1", Qtd = 1
            },
            new Tags{
                Name = "Serviços2", Qtd = 2
            },
            new Tags{
                Name = "Serviços3", Qtd = 11
            },
        };
    }
}
