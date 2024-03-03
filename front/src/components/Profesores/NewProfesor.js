import React, { useState } from "react";
import { CrearProfesor } from "../../services/profesores.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NewProfesor = () => {
  const navigate = useNavigate();

  const [profesor, setData] = useState({
    Nombres: "",
    Apellidos: "",
    Documento: "",
    DirectorCurso: 0,
    FechaIngreso: "",
  });

  const handleInputChange = ({ target }) => {
    setData({
      ...profesor,
      [target.name]: target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validNombres = /^[a-zA-Záéíóú\s]+$/.test(profesor.Nombres);
    const validApellidos = /^[a-zA-Záéíóú\s]+$/.test(profesor.Apellidos);
    const validDocumento = profesor.Documento !== "";
    const validFechaIngreso = profesor.FechaIngreso !== "";
    const validCurso = profesor.DirectorCurso !== 0;

    const isFormValid =
      validNombres &&
      validApellidos &&
      validDocumento &&
      validFechaIngreso &&
      validCurso;

    if (!isFormValid) {
      setErrors({
        Nombres:
          profesor.Nombres === ""
            ? "Los nombres son obligatorios"
            : validNombres
            ? null
            : "Solo se permiten letras y espacios",
        Apellidos:
          profesor.Apellidos === ""
            ? "Los apellidos son obligatorios"
            : validApellidos
            ? null
            : "Solo se permiten letras y espacios",
        Documento: validDocumento ? null : "El documento es obligatorio",
        FechaIngreso: validFechaIngreso
          ? null
          : "La fecha de ingreso es obligatoria",
        DirectorCurso: validCurso ? null : "El curso es obligatorio",
      });
      return;
    }

    CrearProfesor(profesor).then((resp) => {
      if (resp.status == 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: resp.message,
          showConfirmButton: true,
        });
        navigate(-1);
      }
    });
  };

  return (
    <div className="mt-3">
      <h1 className="text-center">Crear Profesor</h1>
      <form
        className="card card-body p-4 container col-4 mt-3"
        onSubmit={handleSubmit}
      >
        <div class="mb-3">
          <label for="nombres" class="form-label">
            Nombres
          </label>
          <input
            type="text"
            class="form-control"
            id="nombres"
            name="Nombres"
            onChange={handleInputChange}
            value={profesor.Nombres}
          />
          {errors.Nombres && (
            <div className="text-danger">{errors.Nombres}</div>
          )}
        </div>

        <div class="mb-3">
          <label for="apellidos" class="form-label">
            Apellidos
          </label>
          <input
            type="text"
            class="form-control"
            id="apellidos"
            name="Apellidos"
            onChange={handleInputChange}
            value={profesor.Apellidos}
          />
          {errors.Apellidos && (
            <div className="text-danger">{errors.Apellidos}</div>
          )}
        </div>

        <div class="mb-3">
          <label for="documento" class="form-label">
            Documento
          </label>
          <input
            type="number"
            class="form-control"
            id="documento"
            name="Documento"
            onChange={handleInputChange}
            value={profesor.Documento}
          />
          {errors.Documento && (
            <div className="text-danger">{errors.Documento}</div>
          )}
        </div>

        <div class="mb-3">
          <label for="curso" class="form-label">
            Director Curso
          </label>
          <select
            class="form-select"
            id="curso"
            name="DirectorCurso"
            onChange={handleInputChange}
            value={profesor.DirectorCurso}
          >
            <option disabled selected value="0">
              Selecciona un curso
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
          {errors.DirectorCurso && (
            <div className="text-danger">{errors.DirectorCurso}</div>
          )}
        </div>

        <div class="mb-3">
          <label for="fecha-ingreso" class="form-label">
            Fecha Ingreso
          </label>
          <input
            type="date"
            class="form-control"
            id="fecha-ingreso"
            name="FechaIngreso"
            onChange={handleInputChange}
            value={profesor.FechaIngreso}
          />
          {errors.FechaIngreso && (
            <div className="text-danger">{errors.FechaIngreso}</div>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProfesor;
