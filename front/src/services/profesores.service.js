import { url } from "../url";

export const GetProfesores = async () => {
  try {
    const resp = await fetch(`${url}/api/Profesores/GetProfesores`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetProfesorById = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Profesores/GetProfesorById/${id}`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const CrearProfesor = async (profesor) => {
  try {
    const resp = await fetch(`${url}/api/Profesores/CrearProfesor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profesor),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EditarProfesor = async (profesor) => {
  try {
    const resp = await fetch(`${url}/api/Profesores/EditarProfesor`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profesor),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EliminarProfesor = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Profesores/EliminarProfesor/${id}`, {
      method: "DELETE",
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};