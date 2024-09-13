using DynamicReport.Api.IServices;
using DynamicReport.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DynamicReport.Api.Controller;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private ITagService _tag;

    public TagController(ITagService tag)
    {
        _tag = tag;
    }

    [HttpGet]
    public List<Tags> GetTags()
    {
        return _tag.GetTags();
    }
    [HttpPost("create")]
    public async Task<IActionResult> CreateTag([FromBody] Tags tag)
    {
        try
        {
            var result = await _tag.CreateTag(tag);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTag([FromBody] Tags tag)
    {
        try
        {
            var result = await _tag.UpdateTag(tag);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteTag(int id)
    {
        try
        {
            var result = await _tag.DeleteTag(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
