using FluentValidation;
using Templator.Domain;
using Templator.WebApi.DTOs;

namespace Templator.WebApi;

public class TemplateDataValidator : AbstractValidator<TemplateCreateDTO>
{
    public TemplateDataValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required")
            .MaximumLength(50)
            .WithMessage("Name cannot exceed 50 characters");

        RuleFor(x => x.HtmlContent)
            .NotEmpty()
            .WithMessage("Html content is required");
    }
}