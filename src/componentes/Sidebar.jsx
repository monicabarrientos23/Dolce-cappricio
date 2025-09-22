import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaClipboardList, FaSignOutAlt, FaListAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Dulce Capriccio</h2>
      <nav>
        <ul>
          <li>
            <Link to="/inicio">
              <FaHome /> Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos">
              <FaShoppingCart /> Productos
            </Link>
          </li>
          <li>
            <Link to="/registro-compra">
              <FaClipboardList /> Registro Compra
            </Link>
          </li>
          <li>
            <Link to="/pedidos">
              <FaListAlt  /> Pedidos
            </Link>
          </li>
          <li className="logout">
            <Link to="/">
              <FaSignOutAlt /> Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;