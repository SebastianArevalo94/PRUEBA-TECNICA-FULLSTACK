import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  EditarCalificacion,
  GetCalificacionById,
} from "../../services/calificaciones.service";
import { GetEstudiantes } from "../../services/estudiantes.service";
import { GetAsignaturas } from "../../services/asignaturas.service";

const UpdateCalificacion = () => {
  const navigate = useNavigate();

  const [calificacion, setData] = useState({
    Id: 0,
    Estudiante: 0,
    Asignatura: 0,
    Nota: null,
  });

  const [estudiantes, setData2] = useState([]);

  const [asignaturas, setData3] = useState([]);

  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setData({
      ...calificacion,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validNota = calificacion.Nota != "";

    const isFormValid = validNota;

    if (!isFormValid) {
      setErrors({
        Nota: validNota ? null : "Nota obligatoria",
      });
      return;
    }

    EditarCalificacion(calificacion).then((resp) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: resp.message,
        showConfirmButton: true,
      });
      navigate(-1);
    });
  };

  useEffect(() => {
    const id = localStorage.getItem("idUpdate");
    GetCalificacionById(id).then((resp) => {
      setData({
        Id: resp.data.id,
        Estudiante: resp.data.estudiante,
        Asignatura: resp.data.asignatura,
        Nota: resp.data.nota,
      });
    });
    GetEstudiantes().then((resp) => {
      setData2(resp.data);
    });
    GetAsignaturas().then((resp) => {
      setData3(resp.data);
    });
  }, []);
  return (
    <div className="mt-3">
      <h1 className="text-center">Editar Calificacion</h1>
      <form
        className="card card-body p-4 container col-4 mt-3"
        onSubmit={handleSubmit}
      >
        <div class="mb-3">
          <label for="estudiante" class="form-label">
            Estudiante
          </label>
          <select
            class="form-select"
            id="estudiante"
            name="Estudiante"
            onChange={handleInputChange}
            value={calificacion.Estudiante}
          >
            <option disabled selected value="0">
              Selecciona un estudiante
            </option>
            {estudiantes.map((estudiante, index) => {
              return (
                <option
                  value={estudiante.id}
                >{`${estudiante.nombres} ${estudiante.apellidos}`}</option>
              );
            })}
          </select>
        </div>

        <div class="mb-3">
          <label for="asignatura" class="form-label">
            Asignatura
          </label>
          <select
            class="form-select"
            id="asignatura"
            name="Asignatura"
            onChange={handleInputChange}
            value={calificacion.Asignatura}
          >
            <option disabled selected value="0">
              Selecciona una asignatura
            </option>
            {asignaturas.map((asignatura, index) => {
              return (
                <option key={index} value={asignatura.id}>
                  {asignatura.nombre}
                </option>
              );
            })}
          </select>
        </div>

        <div class="mb-3">
          <label for="nota" class="form-label">
            Nota
          </label>
          <input
            type="float"
            class="form-control"
            id="nota"
            name="Nota"
            onChange={handleInputChange}
            value={calificacion.Nota}
          />
           {errors.Nota && (<div className="text-danger">{errors.Nota}</div>)}
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

export default UpdateCalificacion;
