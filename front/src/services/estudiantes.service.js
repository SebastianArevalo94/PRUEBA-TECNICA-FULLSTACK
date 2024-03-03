import { url } from "../url";

export const GetEstudiantes = async () => {
  try {
    const resp = await fetch(`${url}/api/Estudiantes/GetEstudiantes`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetEstudianteById = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Estudiantes/GetEstudianteById/${id}`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const CrearEstudiante = async (estudiante) => {
  try {
    const resp = await fetch(`${url}/api/Estudiantes/CrearEstudiante`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estudiante),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EditarEstudiante = async (estudiante) => {
  try {
    const resp = await fetch(`${url}/api/Estudiantes/EditarEstudiante`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estudiante),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EliminarEstudiante = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Estudiantes/EliminarEstudiante/${id}`, {
      method: "DELETE",
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};