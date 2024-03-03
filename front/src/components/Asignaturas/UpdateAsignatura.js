import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  EditarAsignatura,
  GetAsignaturaById,
} from "../../services/asignaturas.service";

const UpdateAsignatura = () => {
  const navigate = useNavigate();

  const [asignatura, setData] = useState({
    Id: 0,
    Nombre: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setData({
      ...asignatura,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validNombre = /^[a-zA-Záéíóú\s]+$/.test(asignatura.Nombre);

    const isFormValid = validNombre;

    if (!isFormValid) {
      setErrors({
        Nombre:
          asignatura.Nombre === ""
            ? "El nombre es obligatorio"
            : validNombre
            ? null
            : "Solo se permiten letras y espacios",
      });
      return;
    }

    EditarAsignatura(asignatura).then((resp) => {
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
    GetAsignaturaById(id).then((resp) => {
      setData({
        Id: resp.data.id,
        Nombre: resp.data.nombre,
      });
    });
  }, []);
  return (
    <div className="mt-3">
      <h1 className="text-center">Editar Asignatura</h1>
      <form
        className="card card-body p-4 container col-4 mt-3"
        onSubmit={handleSubmit}
      >
        <div class="mb-3">
          <label for="nombre" class="form-label">
            Nombre
          </label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            name="Nombre"
            onChange={handleInputChange}
            value={asignatura.Nombre}
          />
          {errors.Nombre && <div className="text-danger">{errors.Nombre}</div>}
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

export default UpdateAsignatura;
