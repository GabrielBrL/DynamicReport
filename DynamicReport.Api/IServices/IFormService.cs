using DynamicReport.Shared;

namespace DynamicReport.Api.IServices;

public interface IFormService
{
    List<Form> GetAllForms();
    Form? GetFormById(int id);
    List<Form> GetFormByName(string name);
    List<Form> GetFormByTag(string name);
    Task CreateForm(Form form);
    Task UpdateForm(Form form);
    Task DeleteForm(int id);
}