import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/clientes/";

export const getClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al cargar clientes:", error);
    return [];
  }
};

export const getCliente = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar cliente:", error);
    return null;
  }
};

export const crearCliente = async (cliente) => {
  try {
    const response = await axios.post(API_URL, cliente);
    return response.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw error;
  }
};

export const actualizarCliente = async (id, cliente) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, cliente);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
};

export const eliminarCliente = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return true;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return false;
  }
};