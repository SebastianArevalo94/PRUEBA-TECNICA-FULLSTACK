import React, { useEffect, useState } from "react";
import {
  EditarEstudiante,
  EliminarEstudiante,
  GetEstudianteById,
} from "../../services/estudiantes.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateEstudiante = () => {
  const navigate = useNavigate();

  const [estudiante, setData] = useState({
    Id: null,
    Nombres: "",
    Apellidos: "",
    Documento: null,
    Curso: null,
    FechaIngreso: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setData({
      ...estudiante,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validNombres = /^[a-zA-Záéíóú\s]+$/.test(estudiante.Nombres);
    const validApellidos = /^[a-zA-Záéíóú\s]+$/.test(estudiante.Apellidos);
    const validDocumento = estudiante.Documento !== "";
    const validFechaIngreso = estudiante.FechaIngreso !== "";

    const isFormValid =
      validNombres && validApellidos && validDocumento && validFechaIngreso;

    if (!isFormValid) {
      setErrors({
        Nombres: estudiante.Nombres === "" ? "Los nombres son obligatorios": validNombres ? null : "Solo se permiten letras y espacios",
        Apellidos: estudiante.Apellidos === "" ? "Los apellidos son obligatorios": validApellidos ? null : "Solo se permiten letras y espacios",
        Documento:  validDocumento ? null : "El documento es obligatorio",
        FechaIngreso: validFechaIngreso
          ? null
          : "La fecha de ingreso es obligatoria",
      });
      return;
    }

    EditarEstudiante(estudiante).then((resp) => {
      if (resp.status == 200) {
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

  useEffect(() => {
    const id = localStorage.getItem("idDelete");
    GetEstudianteById(id).then((resp) => {
      setData({
        Id: resp.data.id,
        Nombres: resp.data.nombres,
        Apellidos: resp.data.apellidos,
        Documento: resp.data.documento,
        Curso: resp.data.curso,
        FechaIngreso: resp.data.fechaIngreso,
      });
    });
  }, []);
  return (
    <div className="mt-4">
      <h1 className="text-center">Editar Estudiante</h1>
      <form
        className="card card-body p-4 container col-4 mt-4"
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
            value={estudiante.Nombres}
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
            value={estudiante.Apellidos}
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
            value={estudiante.Documento}
          />
          {errors.Documento && (
            <div className="text-danger">{errors.Documento}</div>
          )}
        </div>

        <div class="mb-3">
          <label for="curso" class="form-label">
            Curso
          </label>
          <select
            class="form-select"
            id="curso"
            name="Curso"
            onChange={handleInputChange}
            value={estudiante.Curso}
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
            value={estudiante.FechaIngreso}
          />
          {errors.FechaIngreso && (
            <div className="text-danger">{errors.FechaIngreso}</div>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEstudiante;
