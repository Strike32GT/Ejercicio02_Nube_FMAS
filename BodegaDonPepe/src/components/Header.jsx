import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Admin</div>
              <div className="text-xs text-gray-500">Administrador</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
