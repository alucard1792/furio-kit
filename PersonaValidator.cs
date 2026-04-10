namespace ApplicationSettingsServices.Validators;

using ApplicationSettingsServices.Models.Entities;
using FluentValidation;

public class PersonaValidator : AbstractValidator<Persona>
{
    public PersonaValidator()
    {
        ValidarGenerales();
        ValidarNaturales();
        ValidarJuridicas();
    }

    private void ValidarGenerales()
    {
        RuleFor(x => x.TipoDocumento)
            .Cascade(CascadeMode.Stop)
            .Custom((value, context) => {
                //Se pueden agregar reglas personalizadas pero esto no cambia el valor que se va a validar ya que la intencion de FluentValidation es validar, no en mutar atributos (SRP)
                //var cleaned = value?.Trim();
                //var instance = (Persona)context.InstanceToValidate; 
                //instance.TipoDocumento = cleaned;//-> con esto queda aplicada la regla de sanitacion al atributo de salida
            })
            .NotEmpty().WithMessage("TipoDocumento es obligatorio.")
            .Must(t => t == "CC" || t == "NIT")
            .WithMessage("TipoDocumento debe ser CC o NIT.");
        RuleFor(x => x.NumeroDocumento)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("NumeroDocumento no puede ser nulo.")
            .NotEmpty().WithMessage("NumeroDocumento es obligatorio.")
            .Matches("^[0-9]+$").WithMessage("NumeroDocumento debe ser numérico.")
            .MaximumLength(10).WithMessage("NumeroDocumento debe tener máximo 10 caracteres.");
    }

    private void ValidarNaturales()
    {
        When(x => x.TipoDocumento == "CC", () =>
        {
            RuleFor(x => x.Nombre)
                .NotEmpty().WithMessage("Nombre es obligatorio para persona natural.");
            RuleFor(x => x.Apellido)
                .NotEmpty().WithMessage("Apellido es obligatorio para persona natural.");
            RuleFor(x => x.RazonSocial)
                .Empty().WithMessage("RazonSocial no aplica para persona natural.");
        });
    }

    private void ValidarJuridicas()
    {
        When(x => x.TipoDocumento == "NIT", () =>
        {
            RuleFor(x => x.Nombre)
                .NotEmpty().WithMessage("Nombre es obligatorio para persona jurídica.");
            RuleFor(x => x.RazonSocial)
                .NotEmpty().WithMessage("RazonSocial es obligatoria para persona jurídica.");
            RuleFor(x => x.Apellido)
                .Empty().WithMessage("Apellido no aplica para persona jurídica.");
        });
    }
}