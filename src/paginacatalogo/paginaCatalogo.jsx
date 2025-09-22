import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoCard from './ProductoCard';
import productos from './productos.js';
import './paginaCatalogo.css';

const CatalogoProductos = () => {
  const [canasta, setCanasta] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [mostrarCanasta, setMostrarCanasta] = useState(false);
  const navigate = useNavigate();

  // cargar desde localStorage
  useEffect(() => {
    const guardado = localStorage.getItem('canasta');
    if (guardado) {
      setCanasta(JSON.parse(guardado));
    }
  }, []);

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem('canasta', JSON.stringify(canasta));
  }, [canasta]);

  const agregarProducto = (producto) => {
    setCanasta((prev) => {
      const existe = prev.find((item) => item.nombre === producto.nombre);
      if (existe) {
        return prev.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      } else {
        return [...prev, producto];
      }
    });
  };

  const aumentarCantidad = (nombre) => {
    setCanasta((prev) =>
      prev.map((item) =>
        item.nombre === nombre ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (nombre) => {
    setCanasta((prev) =>
      prev
        .map((item) =>
          item.nombre === nombre && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarProducto = (nombre) => {
    setCanasta((prev) => prev.filter((item) => item.nombre !== nombre));
  };

  const totalUnidades = canasta.reduce((total, item) => total + item.cantidad, 0);
  const totalCompra = canasta.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (precioMax === '' || p.precio <= parseFloat(precioMax))
  );

  return (
    <div className="catalogo-container">
      <div
        className="canasta-btn"
        onClick={() => setMostrarCanasta(true)}
        style={{ cursor: 'pointer' }}
      >
        <img src="./imagen/canasta.png" alt="Canasta" />
        <span className="contador-canasta">{totalUnidades}</span>
      </div>

      <h2 className="titulo-catalogo">Catálogo de Productos</h2>

      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <input
          type="text"
          placeholder="Buscar torta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            width: '250px'
          }}
        />
        <input
          type="number"
          placeholder="Precio máx"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            width: '150px'
          }}
        />
      </div>

      <div className="productos-grid">
        {productosFiltrados.map((p) => (
          <ProductoCard
            key={p.id}
            id={p.id}
            nombre={p.nombre}
            precio={p.precio}
            imagen={p.imagen}
            onAgregar={(detalle) => agregarProducto(detalle)}
          />
        ))}
      </div>

      {mostrarCanasta && (
        <aside style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '300px',
          height: '100%',
          background: '#fff',
          borderLeft: '2px solid #ccc',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
          padding: '20px',
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0 }}>Resumen de venta</h3>
            <button
              onClick={() => setMostrarCanasta(false)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ❌
            </button>
          </div>

          {canasta.length === 0 ? (
            <p>La canasta está vacía.</p>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {canasta.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.nombre} x{item.cantidad}</span>
                      <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                      <button onClick={() => aumentarCantidad(item.nombre)}>➕</button>
                      <button onClick={() => disminuirCantidad(item.nombre)}>➖</button>
                      <button onClick={() => eliminarProducto(item.nombre)}>❌</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                Total: S/ {totalCompra.toFixed(2)}
              </p>
              <button
                onClick={() => navigate('/registro-compra', { state: { canasta } })}
                style={{
                  marginTop: '15px',
                  padding: '10px',
                  width: '100%',
                  border: 'none',
                  background: '#ec92b7',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#d8759b'}
                onMouseOut={(e) => e.target.style.background = '#ec92b7'}
              >
                Finalizar compra
              </button>
            </>
          )}
        </aside>
      )}
    </div>
  );
};

export default CatalogoProductos;
