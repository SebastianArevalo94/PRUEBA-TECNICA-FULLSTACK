import { url } from "../url";

export const GetAsignaturas = async () => {
  try {
    const resp = await fetch(`${url}/api/Asignaturas/GetAsignaturas`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetAsignaturaById = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Asignaturas/GetAsignaturaById/${id}`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const CrearAsignatura = async (asignatura) => {
  try {
    const resp = await fetch(`${url}/api/Asignaturas/CrearAsignatura`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asignatura),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EditarAsignatura = async (asignatura) => {
  try {
    const resp = await fetch(`${url}/api/Asignaturas/EditarAsignatura`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asignatura),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EliminarAsignatura = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Asignaturas/EliminarAsignatura/${id}`, {
      method: "DELETE",
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};