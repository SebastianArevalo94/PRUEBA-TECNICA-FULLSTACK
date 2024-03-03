import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  EliminarAsignatura,
  GetAsignaturas,
} from "../../services/asignaturas.service";
import { EliminarCalificacion, GetCalificaciones } from "../../services/calificaciones.service";

const Calificaciones = () => {
  const navigate = useNavigate();

  const [calificaciones, setData] = useState([]);

  const GoTo = (where) => {
    navigate(where);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Realmente quieres eliminar a esta calificacion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarCalificacion(id).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: resp.message,
              showConfirmButton: true,
            });
          }
          GetCalificaciones().then((resp) => {
            setData(resp.data);
          });
        });
      }
    });
  };

  useEffect(() => {
    GetCalificaciones().then((resp) => {
      setData(resp.data);
      console.log(resp.data);
    });
  }, []);

  return (
    <div>
     <div className="mt-2 d-flex justify-content-center">
        <h1 className="mt-1 text-center">Lista Calificaciones</h1>
        <button
            className=" m-3 btn btn-primary"
            onClick={() => {
              GoTo("/crear/calificacion");
            }}
          >
            Crear Nuevo
          </button>
      </div>

      <table class="mt-3 table table-bordered container">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Estudiante</th>
            <th scope="col">Asignatura</th>
            <th scope="col">Nota</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((calificacion, index) => {
            return (
              <tr key={index}>
                <th>{calificacion.id}</th>
                <td>{`${calificacion.estudianteNavigation.nombres} ${calificacion.estudianteNavigation.apellidos}`}</td>
                <td>{calificacion.asignaturaNavigation.nombre}</td>
                <td>{calificacion.nota}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        localStorage.setItem("idUpdate", calificacion.id);
                        GoTo("/editar/calificacion");
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(calificacion.id);
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

export default Calificaciones;
