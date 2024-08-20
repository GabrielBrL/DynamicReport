using DynamicReport.Api.IServices;
using DynamicReport.Shared;

namespace DynamicReport.Api.Services;

public class FormService : IFormService
{
    public List<Form> GetAllForms()
    {
        return new List<Form>
        {
            new Form{
                Id = 1,
                Name = "Teste12",
                Tag = "Serviços"
            },
            new Form{
                Id = 2,
                Name = "Teste2",
                Tag = "Serviços"
            },
            new Form{
                Id = 3,
                Name = "Teste3",
                Tag = "Serviços"
            },
        };
    }

    public Form? GetFormById(int id)
    {
        return GetAllForms().FirstOrDefault(x => x.Id == id);
    }

    public List<Form> GetFormByName(string name)
    {
        return GetAllForms().Where(x => x.Name.Contains(name, StringComparison.OrdinalIgnoreCase)).ToList();
    }

    public List<Form> GetFormByTag(string name)
    {
        return GetAllForms().Where(x => x.Tag == name).ToList();
    }

    public Task CreateForm(Form form)
    {
        throw new NotImplementedException();
    }

    public Task UpdateForm(Form form)
    {
        throw new NotImplementedException();
    }

    public Task DeleteForm(int id)
    {
        throw new NotImplementedException();
    }
}