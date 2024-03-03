import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  EliminarAsignatura,
  GetAsignaturas,
} from "../../services/asignaturas.service";

const Asignaturas = () => {
  const navigate = useNavigate();

  const [asignaturas, setData] = useState([]);

  const GoTo = (where) => {
    navigate(where);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Realmente quieres eliminar a esta asignatura?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarAsignatura(id).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: resp.message,
              showConfirmButton: true,
            });
          }
          GetAsignaturas().then((resp) => {
            setData(resp.data);
          });
        });
      }
    });
  };

  useEffect(() => {
    GetAsignaturas().then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <div className="mt-2 d-flex justify-content-center">
        <h1 className="mt-1 text-center">Lista Asignaturas</h1>
        <button
          className="m-3 btn btn-primary"
          onClick={() => {
            GoTo("/crear/asignatura");
          }}
        >
          Crear Nueva
        </button>
      </div>

      <table class="mt-3 table table-bordered container">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {asignaturas.map((asignatura, index) => {
            return (
              <tr key={index}>
                <th>{asignatura.id}</th>
                <td>{asignatura.nombre}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        localStorage.setItem("idUpdate", asignatura.id);
                        GoTo("/editar/asignatura");
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(asignatura.id);
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

export default Asignaturas;
