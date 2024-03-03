import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const GoTo = (where) => {
    navigate(where);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a
            class="navbar-brand"
            onClick={() => {
              GoTo("/");
            }}
          >
            Prueba Tecnica
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    GoTo("/estudiantes");
                  }}
                >
                  Estudiantes
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    GoTo("/profesores");
                  }}
                >
                  Profesores
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    GoTo("/asignaturas");
                  }}
                >
                  Asignaturas
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    GoTo("/calificaciones");
                  }}
                >
                  Calificaciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
