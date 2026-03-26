import axios from 'axios';

const API_URL = "https://api-backend-don-pepe.onrender.com/api/ventas/";

export const getVentas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al cargar ventas:", error);
    return [];
  }
};

export const getVenta = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar venta:", error);
    return null;
  }
};

export const crearVenta = async (venta) => {
  try {
    const response = await axios.post(API_URL, venta);
    return response.data;
  } catch (error) {
    console.error("Error al crear venta:", error);
    throw error;
  }
};

export const actualizarVenta = async (id, venta) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, venta);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar venta:", error);
    throw error;
  }
};

export const eliminarVenta = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return true;
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    return false;
  }
};

export const getVentasPorCliente = async (clienteId) => {
  try {
    const response = await axios.get(`${API_URL}?cliente=${clienteId}`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar ventas del cliente:", error);
    return [];
  }
};

export const getVentasPorFecha = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(`${API_URL}?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar ventas por fecha:", error);
    return [];
  }
};