using DynamicReport.Api.Data;
using DynamicReport.Api.IServices;
using DynamicReport.Shared;

namespace DynamicReport.Api.Services;

public class TagService : ITagService
{
    private readonly DataContext _context;

    public TagService(DataContext context)
    {
        _context = context;
    }

    public List<Tags> GetTags()
    {
        return _context.Tags.ToList();
    }

    public async Task<Tags> CreateTag(Tags tag)
    {
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();
        return tag;
    }

    public async Task<Tags> UpdateTag(Tags tag)
    {
        var tagDb = _context.Tags.FirstOrDefault(x => tag.ID == x.ID);
        if (tagDb != null)
        {
            tagDb.Name = tag.Name;
            _context.Tags.Update(tagDb);
            await _context.SaveChangesAsync();
        }
        return tagDb;
    }
    
    public async Task<bool> DeleteTag(int id)
    {
        var tag = _context.Tags.FirstOrDefault(x => x.ID == id);
        if (tag != null)
        {
            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

}
