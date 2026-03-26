import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, Users, Wine } from 'lucide-react';
import { getCategorias } from './api/categorias';
import { getProductos } from './api/productos';
import { getClientes } from './api/clientes';
import { getVentas } from './api/ventas';

const Home = () => {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalVentas: 0,
    totalClientes: 0,
    totalCategorias: 0,
    ventasMes: 0,
    crecimientoVentas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categorias, productos, clientes, ventas] = await Promise.all([
          getCategorias(),
          getProductos(),
          getClientes(),
          getVentas()
        ]);

        // Calcular ventas del mes actual
        const mesActual = new Date().getMonth();
        const añoActual = new Date().getFullYear();
        const ventasMesActual = ventas.filter(venta => {
          const fechaVenta = new Date(venta.fecha);
          return fechaVenta.getMonth() === mesActual && fechaVenta.getFullYear() === añoActual;
        });

        const ventasMesAnterior = ventas.filter(venta => {
          const fechaVenta = new Date(venta.fecha);
          return fechaVenta.getMonth() === mesActual - 1 && fechaVenta.getFullYear() === añoActual;
        });

        const crecimiento = ventasMesAnterior.length > 0 
          ? ((ventasMesActual.length - ventasMesAnterior.length) / ventasMesAnterior.length * 100).toFixed(0)
          : 0;

        setStats({
          totalProductos: productos.length,
          totalVentas: ventas.length,
          totalClientes: clientes.length,
          totalCategorias: categorias.length,
          ventasMes: ventasMesActual.length,
          crecimientoVentas: crecimiento
        });
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido, Admin</h2>
        <p className="text-gray-600">Resumen general de Bodega Don Pepe</p>
        
        {/* Season Badge */}
        <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>Temporada alta</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+3 este mes</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalProductos}</div>
          <div className="text-sm text-gray-600">Total Productos</div>
          <div className="text-xs text-gray-500 mt-2">activos</div>
        </div>

        {/* Total Sales Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+{stats.crecimientoVentas}% vs mes anterior</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stats.ventasMes}</div>
          <div className="text-sm text-gray-600">Total Ventas</div>
          <div className="text-xs text-gray-500 mt-2">este mes</div>
        </div>

        {/* Total Clients Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+2 nuevos</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalClientes}</div>
          <div className="text-sm text-gray-600">Total Clientes</div>
          <div className="text-xs text-gray-500 mt-2">registrados</div>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Wine className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Estable</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalCategorias}</div>
          <div className="text-sm text-gray-600">Categorías</div>
          <div className="text-xs text-gray-500 mt-2">disponibles</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventas mensuales</h3>
          <div className="text-sm text-gray-600 mb-6">Ingresos de los últimos 6 meses</div>
          
          {/* Chart Placeholder - Replace with actual chart component */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-gray-400 mb-2">📊</div>
              <div className="text-sm text-gray-500">Gráfico de líneas - Ventas mensuales</div>
              <div className="text-xs text-gray-400 mt-1">Oct • Nov • Dic • Ene • Feb • Mar</div>
            </div>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Por categoría</h3>
          <div className="text-sm text-gray-600 mb-6">Distribución de productos</div>
          
          {/* Chart Placeholder - Replace with actual chart component */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-gray-400 mb-2">🍩</div>
              <div className="text-sm text-gray-500">Gráfico circular - Categorías</div>
              <div className="text-xs text-gray-400 mt-1">Vinos • Espumantes • Cervezas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;