using System;
using System.Collections.Generic;

namespace API_SEBASTIAN.Models;

public partial class Calificaciones
{
    public int Id { get; set; }

    public int? Estudiante { get; set; }

    public int? Asignatura { get; set; }

    public double Nota { get; set; }

    public virtual Asignatura? AsignaturaNavigation { get; set; }

    public virtual Estudiante? EstudianteNavigation { get; set; }
}
