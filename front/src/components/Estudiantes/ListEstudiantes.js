import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  EliminarEstudiante,
  GetEstudiantes,
} from "../../services/estudiantes.service";

const Estudiantes = () => {
  const navigate = useNavigate();

  const [estudiantes, setData] = useState([]);

  const GoTo = (where) => {
    navigate(where);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Realmente quieres eliminar a este estudiante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarEstudiante(id).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: resp.message,
              showConfirmButton: true,
            });
          }
          GetEstudiantes().then((resp) => {
            setData(resp.data);
          });
        });
      }
    });
  };

  useEffect(() => {
    GetEstudiantes().then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <div className="mt-2 d-flex justify-content-center">
        <h1 className="mt-1 text-center">Lista Estudiantes</h1>
        <button
            className=" m-3 btn btn-primary"
            onClick={() => {
              GoTo("/crear/estudiante");
            }}
          >
            Crear Nuevo
          </button>
      </div>

      <table class="mt-3 table table-bordered container">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Documento</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Curso</th>
            <th scope="col">Fecha Ingreso</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante, index) => {
            return (
              <tr>
                <th key={index}>{estudiante.id}</th>
                <td key={index}>{estudiante.documento}</td>
                <td key={index}>{estudiante.nombres}</td>
                <td key={index}>{estudiante.apellidos}</td>
                <td key={index}>{`${estudiante.cursoNavigation.nombre} - ${estudiante.cursoNavigation.codigo}°`}</td>
                <td key={index}>{estudiante.fechaIngreso}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        localStorage.setItem("idDelete", estudiante.id);
                        GoTo("/editar/estudiante");
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(estudiante.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
