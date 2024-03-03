using System;
using System.Collections.Generic;

namespace API_SEBASTIAN.Models;

public partial class Curso
{
    public int Id { get; set; }
    public string? Nombre { get; set; }

    public int Codigo { get; set; }

    public virtual ICollection<Profesor> DirectorCurso { get; set; } = new List<Profesor>();
}