import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EliminarProfesor, GetProfesores } from "../../services/profesores.service";

const Profesores = () => {
  const navigate = useNavigate();

  const [profesores, setData] = useState([]);

  const GoTo = (where) => {
    navigate(where);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Realmente quieres eliminar a este profesor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarProfesor(id).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: resp.message,
              showConfirmButton: true,
            });
          }
          GetProfesores().then((resp) => {
            setData(resp.data);
          });
        });
      }
    });
  };

  useEffect(() => {
    GetProfesores().then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <div className="mt-2 d-flex justify-content-center">
        <h1 className="mt-1 text-center">Lista Profesores</h1>
        <button
            className=" m-3 btn btn-primary"
            onClick={() => {
              GoTo("/crear/profesor");
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
            <th scope="col">Director Curso</th>
            <th scope="col">Fecha Ingreso</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map((profesor, index) => {
            return (
              <tr>
                <th key={index}>{profesor.id}</th>
                <td key={index}>{profesor.documento}</td>
                <td key={index}>{profesor.nombres}</td>
                <td key={index}>{profesor.apellidos}</td>
                <td key={index}>{profesor.cursoNavigation.nombre}</td>
                <td key={index}>{profesor.fechaIngreso}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        localStorage.setItem("idUpdate", profesor.id);
                        GoTo("/editar/profesor");
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(profesor.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {/* <tr>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td><div className='d-flex justify-content-evenly'>
                            <button className='btn btn-success' onClick={() => {
                                GoTo("/editar/profesor")
                            }}>Editar</button>
                            <button className='btn btn-danger' onClick={()=>{
                                handleDelete()
                            }}>Eliminar</button>
                        </div></td>
                    </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Profesores;
