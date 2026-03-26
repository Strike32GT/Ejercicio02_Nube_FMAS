import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - estático, no se recarga */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - estático, no se recarga */}
        <Header title="Dashboard" />
        
        {/* Page Content - solo las rutas cambian */}
        <main className="flex-1 overflow-auto">
          <Navigation />
        </main>
      </div>
    </div>
  );
};

export default Layout;
