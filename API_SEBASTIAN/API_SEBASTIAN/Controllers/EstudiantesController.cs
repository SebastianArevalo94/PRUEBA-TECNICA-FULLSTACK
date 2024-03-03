using API_SEBASTIAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Linq;

namespace API_SEBASTIAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly ColegioContext _context;

        public EstudiantesController(ColegioContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetEstudiantes")]
        public IActionResult GetEstudiantes()
        {
            try
            {
                var estudiantes = _context.Estudiantes
                                    .Include(e => e.CursoNavigation)
                                        .ThenInclude(c => c.DirectorCurso)
                                    .ToList();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = estudiantes
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpGet]
        [Route("GetEstudianteById/{Id:int}")]
        public IActionResult GetEstudianteById(int Id)
        {
            try
            {
                var estudiante = _context.Estudiantes
                                    .Include(e => e.CursoNavigation)
                                        .ThenInclude(c => c.DirectorCurso)
                                    .FirstOrDefault(e => e.Id == Id);

                if (estudiante == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "El estudiante no existe!!",
                    });
                }

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = estudiante,
                    status = 200
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpPost]
        [Route("CrearEstudiante")]
        public IActionResult CreateEstudiante([FromBody] Estudiante estudiante)
        {
            try
            {
                _context.Estudiantes.Add(estudiante);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "El estudiante ha sido creado!!",
                    status = 201
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message,
                    status = 500
                });
            }
        }

        [HttpPut]
        [Route("EditarEstudiante")]
        public IActionResult EditarEstudiante([FromBody] Estudiante newData)
        {
            try
            {
                var estudiante = _context.Estudiantes
                    .Include(e => e.CursoNavigation)
                        .ThenInclude(c => c.DirectorCurso)
                    .FirstOrDefault(e => e.Id == newData.Id);

                if (estudiante == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "El estudiante no existe!!",
                    });
                }

                estudiante.Documento = newData.Documento;
                estudiante.Nombres = newData.Nombres;
                estudiante.Apellidos = newData.Apellidos;
                estudiante.Curso = newData.Curso;
                estudiante.FechaIngreso = newData.FechaIngreso;

                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "El estudiante ha sido actualizado!!",
                    status = 200
                });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpDelete]
        [Route("EliminarEstudiante/{Id:int}")]
        public IActionResult DeleteEstudiante(int Id)
        {
            try
            {
                var estudiante = _context.Estudiantes.Find(Id);

                if (estudiante == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "El estudiante no existe!!",
                    });
                }

                _context.Estudiantes.Remove(estudiante);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Estudiante Eliminado!!",
                    status = 200
                });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message,
                });
            }
        }

    
    }
}
