import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Categoria from '../Categoria';
import Productos from '../Productos';
import Clientes from '../Clientes';
import Ventas from '../Ventas';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categorias" element={<Categoria />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/ventas" element={<Ventas />} />
    </Routes>
  );
};

export default Navigation;
