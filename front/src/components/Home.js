import React from "react";
import { useNavigate } from "react-router-dom";
import imagenEstudiantes from "../images/estudiantes.avif";
import imagenProfesores from "../images/profesores.avif";
import imgenCalificacion from "../images/calificacion.jpg";
import imagenAsignaturas from "../images/asignaturas.avif";

const Home = () => {
  const navigate = useNavigate();

  const GoTo = (link) => {
    navigate(link);
  };

  return (
    <div className="mt-2 d-flex flex-column align-items-center gap-4">
      <h1 className="">Prueba Tecnica Sebasitan Arevalo</h1>
      <p className="" style={{ fontSize: "22px" }}>
        Soy Sebastian Arevalo, y esta es mi prueba tecnica. Hecha con .Net para
        el API y React JS para el Front
      </p>
      <div className="d-flex justify-content-evenly gap-5">
        <div className="d-flex flex-column">
          <img src={imagenEstudiantes} style={{ width: "250px" }} />
          <button
            className="btn btn-primary"
            onClick={() => {
              GoTo("/estudiantes");
            }}
          >
            Ir a Estudiantes
          </button>
        </div>

        <div className="d-flex flex-column">
          <img src={imagenProfesores} style={{ width: "290px" }} />
          <button
            className="btn btn-secondary"
            onClick={() => {
              GoTo("/profesores");
            }}
          >
            Ir a Profesores
          </button>
        </div>
        <div className="d-flex flex-column">
          <img src={imgenCalificacion} style={{ width: "250px" }} />
          <button
            className="btn btn-success"
            onClick={() => {
              GoTo("/calificaciones");
            }}
          >
            Ir a Calificaciones
          </button>
        </div>

        <div className="d-flex flex-column">
          <img src={imagenAsignaturas} style={{ width: "250px" }} />
          <button
            className="btn btn-danger"
            onClick={() => {
              GoTo("/asignaturas");
            }}
          >
            Ir a Asignaturas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
