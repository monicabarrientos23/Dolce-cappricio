import React, { useState } from 'react';
import './paginaCatalogo.css';

const ProductoCard = ({ id, nombre, precio, imagen, onAgregar }) => {
  const [cantidad, setCantidad] = useState(0);

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 0) setCantidad(cantidad - 1);
  };

  const agregarACanasta = () => {
    if (cantidad > 0) {
      onAgregar({ id, nombre, precio, cantidad, imagen });
      setCantidad(0); // Reiniciar el contador
    }
  };

  return (
    <div className="producto-card">
      <img src={imagen} alt={nombre} className="producto-img" />
      <h3 className="producto-nombre">{nombre}</h3>
      <p className="producto-precio">S/ {precio.toFixed(2)}</p>

      <div className="contador">
        <button className="btn-contador" onClick={disminuir}>−</button>
        <span className="cantidad">{cantidad}</span>
        <button className="btn-contador" onClick={aumentar}>+</button>
      </div>

      <button className="btn-agregar" onClick={agregarACanasta}>
        Agregar a Canasta
      </button>
    </div>
  );
};

export default ProductoCard;



