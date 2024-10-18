import axios from 'axios';
import { urlBackend } from "../../../config";

const apiClient = axios.create({
  baseURL: `${urlBackend}`,
  timeout: 5000,
});
const normal = JSON.parse(localStorage.getItem('userDetails'))


export const serviceGetListarMenu = async (num, size) => {
  try {
    const response = await apiClient.get('/api/v1/core/menu/listar/?page_num=' + num + '&page_size=' + size, {
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
export const servicePostAgregarMenu = async (data) => {
  try {
    const response = await apiClient.post('/api/v1/core/menu/agregar', data, {
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
export const servicePatchEditarMenu = async (data) => {
  try {
    const response = await apiClient.patch('/api/v1/core/menu/editar', data, {
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
export const serviceDeleteEliminarMenu = async (data) => {
  try {
    const response = await apiClient.post('/api/v1/core/menu/eliminar', data, {
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