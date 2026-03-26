import React, { useState, useEffect } from 'react';

const AgregarVentaModal = ({ isOpen, onClose, onVentaAgregada }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    producto: '',
    cantidad: '',
    precioUnitario: '',
    total: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Importar y obtener datos reales
        const { getClientes } = await import('../../api/clientes');
        const { getProductos } = await import('../../api/productos');
        
        const [clientesData, productosData] = await Promise.all([
          getClientes(),
          getProductos()
        ]);
        
        setClientes(clientesData);
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Importar función para guardar venta
      const { crearVenta } = await import('../../api/ventas');
      
      const nuevaVenta = await crearVenta(formData);
      console.log('Venta agregada:', nuevaVenta);
      
      // Notificar al componente padre
      if (onVentaAgregada) {
        onVentaAgregada(nuevaVenta);
      }
      
      // Resetear formulario y cerrar modal
      setFormData({
        cliente: '',
        producto: '',
        cantidad: '',
        precioUnitario: '',
        total: '',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente'
      });
      onClose();
    } catch (error) {
      console.error('Error al agregar venta:', error);
      alert('Error al agregar la venta. Por favor, intenta nuevamente.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Calcular total automáticamente
    if (e.target.name === 'cantidad' || e.target.name === 'precioUnitario') {
      const cantidad = e.target.name === 'cantidad' ? e.target.value : formData.cantidad;
      const precio = e.target.name === 'precioUnitario' ? e.target.value : formData.precioUnitario;
      const total = (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0);
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        total: total.toFixed(2)
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Nueva Venta</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente
              </label>
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Producto
              </label>
              <select
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              >
                <option value="">Seleccionar producto</option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} - S/{producto.precio}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Unitario
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="precioUnitario"
                  value={formData.precioUnitario}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total
              </label>
              <input
                type="text"
                name="total"
                value={formData.total}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-semibold"
                placeholder="S/ 0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          {/* Botones con la paleta de colores */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Crear Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarVentaModal;
