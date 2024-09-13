using DynamicReport.Shared;

namespace DynamicReport.Api.IServices;

public interface IFormService
{
    List<Form> GetAllForms();
    Form? GetFormById(int id);
    List<Form> GetFormByName(string name);
    List<Form> GetFormByTag(string name);
    Task<Form> CreateForm(Form form);
    Task<Form?> UpdateForm(Form form);
    Task<bool> DeleteForm(int id);
}