import axios from 'axios';
import { urlBackend } from "../../../config";

const apiClient = axios.create({
  baseURL: `${urlBackend}`,
  timeout: 5000,
});
const normal = JSON.parse(localStorage.getItem('userDetails'))


export const serviceGetListarUsuarios = async (num, size) => {
  try {
    const response = await apiClient.get('/api/v1/core/usuario/listar/?page_num=' + num + '&page_size=' + size, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const servicePostAgregarUsuarios = async (data) => {
  try {
    const response = await apiClient.post('/api/v1/core/usuario/agregar', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const servicePostEditarUsuarios = async (data) => {
  try {
    const response = await apiClient.patch('/api/v1/core/usuario/actualizar-perfil', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const servicePostEliminarUsuarios = async (data) => {
  try {
    const response = await apiClient.patch('/api/v1/core/usuario/eliminar-perfil', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const servicePostBuscarUsuario = async (data) => {
  try {
    const response = await apiClient.post('/api/v1/core/iglesia/buscar', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const serviceGetBuscarCogopDistrito = async (nombre) => {
  try {
    const response = await apiClient.get('/api/v1/core/ciudades/buscar-distrito-cogop?nombre=' + nombre, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const servicePostAgregarImagen = async (data) => {
  try {
    const response = await apiClient.post('/api/v1/core/usuario/actualizar-imagen', data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const servicePostImagenBlanco = async (data) => {
  try {
    const response = await apiClient.post('/api/v1/core/usuario/imagenBlanco', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + normal.idToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};