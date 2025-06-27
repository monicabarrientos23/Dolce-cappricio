import React, { useState } from 'react';
import ProductoCard from './ProductoCard';
import productos from './productos.js';
import './paginaCatalogo.css'; // Asegúrate de importar los estilos aquí si no está

const CatalogoProductos = () => {
    const [canasta, setCanasta] = useState([]);

    const agregarProducto = (producto) => {
        setCanasta([...canasta, producto]);
        console.log('Canasta actual:', [...canasta, producto]);
    };

    return (
        <div className="catalogo-container">
            {/* Botón de canasta */}
            <div className="canasta-btn">
                <img
                    src="./imagen/canasta.png"
                    alt="Canasta"
                />
                <span className="contador-canasta">{canasta.length}</span>
            </div>


            <h2 className="titulo-catalogo">Catálogo de Productos</h2>
            <div className="productos-grid">
                {productos.map((p) => (
                    <ProductoCard
                        key={p.id}
                        nombre={p.nombre}
                        precio={p.precio}
                        imagen={p.imagen}
                        onAgregar={() => agregarProducto(p)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CatalogoProductos;
