import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/categorias/";

export const getCategorias = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al cargar categorías:", error);
    return [];
  }
};

export const getCategoria = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar categoría:", error);
    return null;
  }
};

export const crearCategoria = async (categoria) => {
  try {
    const response = await axios.post(API_URL, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría:", error);
    throw error;
  }
};

export const actualizarCategoria = async (id, categoria) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  }
};

export const eliminarCategoria = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return true;
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    return false;
  }
};