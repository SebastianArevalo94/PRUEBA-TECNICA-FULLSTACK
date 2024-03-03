using API_SEBASTIAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_SEBASTIAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignaturasController : ControllerBase
    {
        private readonly ColegioContext _context;

        public AsignaturasController(ColegioContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetAsignaturas")]
        public IActionResult GetAsignaturas()
        {
            try
            {
                var asignaturas = _context.Asignaturas.ToList();
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = asignaturas
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
        [Route("GetAsignaturaById/{Id:int}")]
        public IActionResult GetAsignaturaById(int Id)
        {
            try
            {
                var asignaturas = _context.Asignaturas.Find(Id);
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Success",
                    data = asignaturas
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
        [Route("CrearAsignatura")]
        public IActionResult CrearAsignatura([FromBody] Asignatura asignatura)
        {
            try
            {
                _context.Asignaturas.Add(asignatura);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "Asignatura Creada!",
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
        [Route("EditarAsignatura")]
        public IActionResult EditarAsignatura([FromBody] Asignatura newData)
        {
            try
            {
                var asignatura = _context.Asignaturas.Find(newData.Id);

                if (asignatura == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "Asignatura no encontrada!!",
                        status = 404
                    });
                }

                asignatura.Nombre = newData.Nombre;

                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Asignatura actualizada!!",
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
        [Route("EliminarAsignatura/{Id:int}")]

        public IActionResult EliminarAsignatura(int Id)
        {
            try
            {
                var asignatura = _context.Asignaturas.Find(Id);

                if (asignatura == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new
                    {
                        message = "Asignatura no encontrada!!",
                        status = 404
                    });
                }


                _context.Asignaturas.Remove(asignatura);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Asignatura Elimiada!!",
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
