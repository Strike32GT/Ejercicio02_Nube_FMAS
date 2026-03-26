import React, { useState, useEffect } from 'react';
import { Search, Plus, ShoppingCart, Eye, Download } from 'lucide-react';
import { getVentas, eliminarVenta } from './api/ventas';
import AgregarVentaModal from './components/modals/AgregarVentaModal';

const Ventas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchVentas = async () => {
    try {
      const data = await getVentas();
      setVentas(data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const handleDelete = async (id_venta) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        const success = await eliminarVenta(id_venta);
        if (success) {
          setVentas(ventas.filter(venta => venta.id_venta !== id_venta));
        }
      } catch (error) {
        console.error('Error al eliminar venta:', error);
      }
    }
  };

  const handleVentaAgregada = (nuevaVenta) => {
    // Agregar la nueva venta a la lista
    setVentas(prevVentas => [...prevVentas, nuevaVenta]);
  };

  const filteredVentas = ventas.filter(venta =>
    venta.id_cliente && venta.id_cliente.toString().includes(searchTerm.toLowerCase()) ||
    venta.total && venta.total.toString().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-600">Cargando ventas...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Ventas</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar venta..."
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
            <span>Nueva venta</span>
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVentas.map((venta) => (
                <tr key={venta.id_venta} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.id_venta}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors" title="Ver detalles">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors" title="Descargar comprobante">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{filteredVentas.length}</span> de{' '}
            <span className="font-medium">{ventas.length}</span> ventas registradas
          </div>
        </div>
      </div>

      {/* Modal */}
      <AgregarVentaModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onVentaAgregada={handleVentaAgregada}
      />
    </div>
  );
};

export default Ventas;