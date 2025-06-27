import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PaginaInicio from './paginaInicio/paginaInicio.jsx';
import CatalogoProductos from './paginacatalogo/paginaCatalogo.jsx'; // ✅ Importación del catálogo

const App = () => {
  return (
    <Routes>
      {/* Redirige / al inicio de sesión */}
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      
      {/* Ruta a la página de inicio */}
      <Route path="/inicio" element={<PaginaInicio />} />

      {/* Ruta al catálogo */}
      <Route path="/catalogo" element={<CatalogoProductos />} />
    </Routes>
  );
};

export default App;
