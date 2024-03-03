using System;
using System.Collections.Generic;

namespace API_SEBASTIAN.Models;

public partial class Estudiante
{
    public int Id { get; set; }

    public long? Documento { get; set; }

    public string? Nombres { get; set; }

    public string? Apellidos { get; set; }

    public int? Curso { get; set; }

    public DateOnly? FechaIngreso { get; set; }

    //public virtual ICollection<Calificaciones> Calificaciones { get; set; } = new List<Calificaciones>();

    public virtual Curso? CursoNavigation { get; set; }
}
