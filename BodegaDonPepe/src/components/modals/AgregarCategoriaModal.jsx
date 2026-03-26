import React, { useState } from 'react';

const AgregarCategoriaModal = ({ isOpen, onClose, onCategoriaAgregada }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: true  // Boolean para PostgreSQL
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Importar función para guardar categoría
      const { crearCategoria } = await import('../../api/categorias');
      
      console.log('Datos que enviaremos:', formData);
      const nuevaCategoria = await crearCategoria(formData);
      console.log('Categoría agregada:', nuevaCategoria);
      
      // Notificar al componente padre
      if (onCategoriaAgregada) {
        onCategoriaAgregada(nuevaCategoria);
      }
      
      // Resetear formulario y cerrar modal
      setFormData({
        nombre: '',
        descripcion: '',
        estado: true  // Boolean para PostgreSQL
      });
      onClose();
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      alert('Error al agregar la categoría. Por favor, intenta nuevamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Agregar Nueva Categoría</h2>
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
                Nombre de la Categoría
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Vinos, Cervezas, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción de la categoría..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="estado"
                    checked={formData.estado}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Activo</span>
                </label>
              </div>
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
              Agregar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarCategoriaModal;
