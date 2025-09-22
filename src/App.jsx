import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import PaginaLogin from "./paginalogin/paginaLogin";
import PaginaInicio from "./paginainicio/paginaInicio";
import CatalogoProductos from "./paginacatalogo/paginaCatalogo";
import PaginaRegistroCompra from "./paginaregistrocompra/paginaRegistroCompra";
import PaginaPedidos from "./paginapedidos/paginaPedidos"; // ✅ AGREGADO

const App = () => {
  const [autenticado, setAutenticado] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";

  useEffect(() => {
    if (!autenticado && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [autenticado, location, navigate]);

  return (
    <div style={{ display: "flex" }}>
      {!isLoginPage && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={<PaginaLogin setAutenticado={setAutenticado} />}
          />
          <Route
            path="/inicio"
            element={autenticado ? <PaginaInicio /> : <Navigate to="/" replace />}
          />
          <Route
            path="/productos"
            element={autenticado ? <CatalogoProductos /> : <Navigate to="/" replace />}
          />
          <Route
            path="/registro-compra"
            element={autenticado ? <PaginaRegistroCompra /> : <Navigate to="/" replace />}
          />
          <Route
            path="/pedidos"
            element={autenticado ? <PaginaPedidos /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
