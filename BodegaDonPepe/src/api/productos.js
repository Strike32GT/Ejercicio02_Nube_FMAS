import axios from 'axios';

const API_URL = "https://api-backend-don-pepe.onrender.com/api/productos/";

export const getProductos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
};

export const getProducto = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar producto:", error);
    return null;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await axios.post(API_URL, producto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return true;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return false;
  }
};

export const getProductosPorCategoria = async (categoriaId) => {
  try {
    const response = await axios.get(`${API_URL}?categoria=${categoriaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar productos por categoría:", error);
    return [];
  }
};

export const getProductosConStockBajo = async () => {
  try {
    const response = await axios.get(`${API_URL}?stock_bajo=true`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar productos con stock bajo:", error);
    return [];
  }
};