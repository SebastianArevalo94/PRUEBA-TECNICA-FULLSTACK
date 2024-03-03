import { url } from "../url";

export const GetCalificaciones = async () => {
  try {
    const resp = await fetch(`${url}/api/Calificaciones/GetCalificaciones`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetCalificacionById = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Calificaciones/GetCalificacionById/${id}`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const CrearCalificacion = async (calificacion) => {
  try {
    const resp = await fetch(`${url}/api/Calificaciones/CrearCalificacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calificacion),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EditarCalificacion = async (calificacion) => {
  try {
    const resp = await fetch(`${url}/api/Calificaciones/EditarCalificacion`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calificacion),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const EliminarCalificacion = async (id) => {
  try {
    const resp = await fetch(`${url}/api/Calificaciones/EliminarCalificacion/${id}`, {
      method: "DELETE",
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};