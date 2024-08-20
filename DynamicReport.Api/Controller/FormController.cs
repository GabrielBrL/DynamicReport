using DynamicReport.Api.IServices;
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

    [HttpGet("tags")]
    public IActionResult GetTags()
    {
        var result = _tagService.GetTags();
        return Ok(result);
    }
}