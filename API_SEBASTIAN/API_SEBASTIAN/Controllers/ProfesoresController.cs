using API_SEBASTIAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_SEBASTIAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoresController : ControllerBase
    {
        private readonly ColegioContext _context;

        public ProfesoresController(ColegioContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetProfesores")]
        public IActionResult GetProfesores()
        {
            try
            {
                var profesores = _context.Profesores
                                    .Include(p => p.CursoNavigation)
                                    .ToList();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = profesores
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
        [Route("GetProfesorById/{Id:int}")]
        public IActionResult GetProfesorById(int Id)
        {
            try
            {
                var profesor = _context.Profesores.Include(p => p.CursoNavigation).FirstOrDefault(p => p.Id == Id);

                if (profesor == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "Profesor no encontrado!!"
                    });
                }

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = profesor
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
        [Route("CrearProfesor")]
        public IActionResult CrearProfesor([FromBody] Profesor profesor)
        {
            try
            {
                _context.Profesores.Add(profesor);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "EL profesor ha sido creado!!",
                    status = 201
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

        [HttpPut]
        [Route("EditarProfesor")]
        public IActionResult EditarProfesor(Profesor newData)
        {
            try
            {
                var profesor = _context.Profesores.Find(newData.Id);
                string info = String.Empty;

                if (profesor == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "El preofesor no existe!!",
                    });
                }

                profesor.Documento = newData.Documento;
                profesor.Nombres = newData.Nombres;
                profesor.Apellidos = newData.Apellidos;
                profesor.FechaIngreso = newData.FechaIngreso;
                profesor.DirectorCurso = newData.DirectorCurso;

                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Profesor actualizado!!",
                    info,
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
        [Route("EliminarProfesor/{Id:int}")]
        public IActionResult EliminarProfesor(int Id)
        {
            try
            {
                var profesor = _context.Profesores.Find(Id);

                if (profesor == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "El preofesor no existe!!",
                    });
                }

                _context.Profesores.Remove(profesor);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Profesor Eliminado!!",
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
