using DynamicReport.Api.Data;
using DynamicReport.Api.IServices;
using DynamicReport.Shared;

namespace DynamicReport.Api.Services;

public class FormService : IFormService
{
    private readonly DataContext _context;

    public FormService(DataContext context)
    {
        _context = context;
    }

    public List<Form> GetAllForms()
    {
        return _context.Forms.ToList();
    }

    public Form? GetFormById(int id)
    {
        return GetAllForms().FirstOrDefault(x => x.ID == id);
    }

    public List<Form> GetFormByName(string name)
    {
        return GetAllForms().Where(x => x.Name.Contains(name, StringComparison.OrdinalIgnoreCase)).ToList();
    }

    public List<Form> GetFormByTag(string name)
    {
        return GetAllForms().Where(x => x.Tag == name).ToList();
    }

    public async Task<Form> CreateForm(Form form)
    {
        _context.Forms.Add(form);
        await _context.SaveChangesAsync();
        return form;
    }

    public async Task<Form?> UpdateForm(Form form)
    {
        var formDb = _context.Forms.FirstOrDefault(x => form.ID == x.ID);
        if (formDb != null)
        {
            formDb.Name = form.Name;
            formDb.Tag = form.Tag;
            _context.Forms.Update(formDb);
            await _context.SaveChangesAsync();
        }
        return formDb;
    }

    public async Task<bool> DeleteForm(int id)
    {
        var form = _context.Forms.FirstOrDefault(x => x.ID == id);
        if (form != null)
        {
            _context.Forms.Remove(form);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}