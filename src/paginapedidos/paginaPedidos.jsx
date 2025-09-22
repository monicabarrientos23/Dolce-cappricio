import React, { useState, useEffect } from "react";
import "./paginaPedidos.css";
import { FiTrash2, FiDownload } from "react-icons/fi";

const PaginaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  // cargar los pedidos desde localStorage
  useEffect(() => {
    const pedidosGuardados = localStorage.getItem("pedidos");
    if (pedidosGuardados) {
      setPedidos(JSON.parse(pedidosGuardados));
    }
  }, []);

  // guardar pedidos en localStorage
  const actualizarLocalStorage = (nuevosPedidos) => {
    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
    setPedidos(nuevosPedidos);
  };

  // eliminar pedido
  const eliminarPedido = (index) => {
    const nuevosPedidos = pedidos.filter((_, i) => i !== index);
    actualizarLocalStorage(nuevosPedidos);
  };

  // descargar pedido
  const descargarPedido = (pedido, numero) => {
    let contenido = `Pedido Nº ${numero}\n\n`;
    contenido += `Cliente: ${pedido.nombre} ${pedido.apellido}\n`;
    contenido += `Documento: ${pedido.tipoDocumento} ${pedido.numeroDocumento}\n`;
    contenido += `Teléfono: ${pedido.telefono}\n`;
    contenido += `Modo: ${pedido.recogo}\n`;
    contenido += pedido.recogo === "tienda"
      ? `Sede: ${pedido.sede}\n`
      : `Ubicación: ${pedido.ubicacion}\n`;
    contenido += `Departamento: ${pedido.departamento}\n`;
    contenido += `Provincia: ${pedido.provincia}\n`;
    contenido += `Referencia: ${pedido.referencia}\n\n`;
    contenido += `Productos:\n`;
    pedido.canasta.forEach((item) => {
      contenido += `- ${item.nombre} x${item.cantidad} (S/ ${item.precio})\n`;
    });

    // crear blob y descargar
    const blob = new Blob([contenido], { type: "text/plain" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `pedido_${numero}.txt`;
    enlace.click();
  };

  return (
    <div className="pagina-pedidos">
      <h2>Pedidos Registrados</h2>
      <table className="tabla-pedidos">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Productos</th>
            <th>Cliente</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No hay pedidos registrados.</td>
            </tr>
          ) : (
            pedidos.map((pedido, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {pedido.canasta.map((item, i) => (
                    <div key={i}>{item.nombre} x{item.cantidad}</div>
                  ))}
                </td>
                <td>{pedido.nombre} {pedido.apellido}</td>
                <td>{pedido.tipoDocumento} {pedido.numeroDocumento}</td>
                <td>{pedido.telefono}</td>
                <td>
                  {pedido.recogo === "tienda"
                    ? `Sede: ${pedido.sede}`
                    : `Ubicación: ${pedido.ubicacion}`
                  }
                  <br />
                  {pedido.departamento}, {pedido.provincia}
                  <br />
                  {pedido.referencia}
                </td>
                <td>
                  <button className="icon-btn" onClick={() => eliminarPedido(index)}>
                    <FiTrash2 size={20} />
                  </button>
                  <button className="icon-btn" onClick={() => descargarPedido(pedido, index + 1)}>
                    <FiDownload size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
                                           
export default PaginaPedidos;
