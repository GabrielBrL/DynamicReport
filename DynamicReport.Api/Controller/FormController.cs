using DynamicReport.Api.IServices;
using DynamicReport.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DynamicReport.Api.Controller;

[ApiController]
[Route("api/[controller]")]
public class FormController : ControllerBase
{
    private readonly IFormService _formService;
    private readonly ITagService _tagService;

    public FormController(IFormService formService, ITagService tagService)
    {
        _formService = formService;
        _tagService = tagService;
    }
    #region GET
    [HttpGet("all")]
    public IActionResult GetForms()
    {
        var result = _formService.GetAllForms();
        return Ok(result);
    }
    [HttpGet("id/{id}")]
    public IActionResult GetFormById(int id)
    {
        var result = _formService.GetFormById(id);
        return Ok(result);
    }

    [HttpGet("name/{name}")]
    public IActionResult GetFormByName(string name)
    {
        var result = _formService.GetFormByName(name);
        return Ok(result);
    }
    [HttpGet("tag/{name}")]
    public IActionResult GetFormByTag(string name)
    {
        var result = _formService.GetFormByTag(name);
        return Ok(result);
    }
    #endregion

    [HttpPost("create")]
    public async Task<IActionResult> CreateNewForm([FromBody] Form form)
    {
        try
        {
            var result = await _formService.CreateForm(form);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateForm([FromBody] Form form)
    {
        try
        {
            var result = await _formService.UpdateForm(form);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteForm(int id)
    {
        try
        {
            var result = await _formService.DeleteForm(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}