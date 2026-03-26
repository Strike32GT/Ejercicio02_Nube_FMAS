import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Grid3x3, Package, Users, ShoppingCart, Wine } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/categorias', label: 'Categorías', icon: Grid3x3 },
    { path: '/productos', label: 'Productos', icon: Package },
    { path: '/clientes', label: 'Clientes', icon: Users },
    { path: '/ventas', label: 'Ventas', icon: ShoppingCart },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Wine className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">Don Pepe</div>
            <div className="text-xs text-blue-200">Bodega</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4">
          Menú Principal
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-950 border-l-4 border-blue-400'
                    : 'hover:bg-blue-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
