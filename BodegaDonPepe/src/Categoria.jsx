import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Package } from 'lucide-react';
import { getCategorias, eliminarCategoria } from './api/categorias';
import AgregarCategoriaModal from './components/modals/AgregarCategoriaModal';

const Categoria = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        const success = await eliminarCategoria(id);
        if (success) {
          setCategorias(categorias.filter(cat => cat.id !== id));
        }
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  const handleCategoriaAgregada = (nuevaCategoria) => {
    // Agregar la nueva categoría a la lista
    setCategorias(prevCategorias => [...prevCategorias, nuevaCategoria]);
  };

  const filteredCategorias = categorias.filter(categoria =>
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-600">Cargando categorías...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Categorías</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar categoría..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar categoría</span>
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategorias.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categoria.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categoria.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      categoria.estado === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {categoria.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(categoria.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{filteredCategorias.length}</span> de{' '}
            <span className="font-medium">{categorias.length}</span> categorías registradas
          </div>
        </div>
      </div>

      {/* Modal */}
      <AgregarCategoriaModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onCategoriaAgregada={handleCategoriaAgregada}
      />
    </div>
  );
};

export default Categoria;