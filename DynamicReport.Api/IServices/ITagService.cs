using DynamicReport.Shared;

namespace DynamicReport.Api.IServices;

public interface ITagService
{
    List<Tags> GetTags();
    Task<Tags> CreateTag(Tags tag);
    Task<Tags> UpdateTag(Tags tag);
    Task<bool> DeleteTag(int id);

}
