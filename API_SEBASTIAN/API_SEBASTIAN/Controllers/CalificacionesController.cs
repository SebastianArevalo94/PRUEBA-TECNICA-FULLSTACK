using API_SEBASTIAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_SEBASTIAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalificacionesController : ControllerBase
    {
        private readonly ColegioContext _context;

        public CalificacionesController(ColegioContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetCalificaciones")]
        public IActionResult GetCalificaciones()
        {
            try
            {
                var calificaciones = _context.Calificaciones.Include(c => c.AsignaturaNavigation).Include(c => c.EstudianteNavigation);
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = calificaciones,
                    status = 200
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

        [HttpGet]
        [Route("GetCalificacionById/{Id:int}")]
        public IActionResult GetCalificacionById(int Id)
        {
            try
            {
                var calificacion = _context.Calificaciones.Include(c => c.AsignaturaNavigation).Include(c => c.EstudianteNavigation).FirstOrDefault(c => c.Id == Id);
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = calificacion,
                    status = 200
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

        [HttpPost]
        [Route("CrearCalificacion")]
        public IActionResult CrearCalificacion([FromBody] Calificaciones calificacion)
        {
            try
            {
                _context.Calificaciones.Add(calificacion);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "Calificacion Creada!!",
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
        [Route("EditarCalificacion")]
        public IActionResult EditarCalificacion([FromBody] Calificaciones calificacion)
        {
            try
            {
                var calificacionBD = _context.Calificaciones.Include(c => c.AsignaturaNavigation).Include(c => c.EstudianteNavigation).FirstOrDefault(c => c.Id == calificacion.Id);

                if(calificacionBD == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "Calificacion no encontrada!!",
                        status = 404
                    });
                }

                calificacionBD.Estudiante = calificacion.Estudiante;
                calificacionBD.Asignatura = calificacion.Asignatura;
                calificacionBD.Nota = calificacion.Nota;

                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Calificacion actualizada!!",
                    status = 200
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

        [HttpDelete]
        [Route("EliminarCalificacion/{Id:int}")]
        public IActionResult EliminarCalificacion(int Id)
        {
            try
            {
                var calificacion = _context.Calificaciones.Include(c => c.AsignaturaNavigation).Include(c => c.EstudianteNavigation).FirstOrDefault(c => c.Id == Id);

                if (calificacion == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "Calificacion no encontrada!!",
                        status = 404
                    });
                }

                _context.Calificaciones.Remove(calificacion);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Calificacion eliminada!!",
                    status = 200
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
    }
}
