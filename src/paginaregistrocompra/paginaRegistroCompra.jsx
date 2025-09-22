import React, { useState, useEffect } from "react";
import "./paginaRegistroCompra.css";

const PaginaRegistroCompra = () => {
  const [recogo, setRecogo] = useState("tienda");

  // 🚀 Carrito
  const [canasta, setCanasta] = useState([]);
  const [mostrarCanasta, setMostrarCanasta] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem("canasta");
    if (guardado) {
      setCanasta(JSON.parse(guardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("canasta", JSON.stringify(canasta));
  }, [canasta]);

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

  // 🚀 Formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    sede: "",
    ubicacion: "",
    departamento: "",
    provincia: "",
    referencia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();

    // Crear pedido
    const pedido = {
      ...formulario,
      recogo,
      sede: recogo === "tienda" ? formulario.sede : "",
      ubicacion: recogo === "envio" ? formulario.ubicacion : "",
      canasta,
      totalCompra
    };

    // Guardar en localStorage
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));

    alert("¡Pedido guardado exitosamente!");

    // Reset form
    setFormulario({
      nombre: "",
      apellido: "",
      tipoDocumento: "",
      numeroDocumento: "",
      telefono: "",
      sede: "",
      ubicacion: "",
      departamento: "",
      provincia: "",
      referencia: "",
    });
    setRecogo("tienda");
  };

  return (
    <div className="registro-compra">
      <h2>Registro de Compra</h2>

      <div
        className="canasta-btn"
        onClick={() => setMostrarCanasta(true)}
        style={{
          cursor: "pointer",
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1100
        }}
      >
        <img src="./imagen/canasta.png" alt="Canasta" />
        <span className="contador-canasta">{totalUnidades}</span>
      </div>

      {mostrarCanasta && (
        <aside
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            background: "#fff",
            borderLeft: "2px solid #ccc",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
            padding: "20px",
            zIndex: 1000,
            overflowY: "auto"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <h3 style={{ margin: 0 }}>Resumen de venta</h3>
            <button
              onClick={() => setMostrarCanasta(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ❌
            </button>
          </div>

          {canasta.length === 0 ? (
            <p>La canasta está vacía.</p>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {canasta.map((item, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>{item.nombre} x{item.cantidad}</span>
                      <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        marginTop: "5px"
                      }}
                    >
                      <button onClick={() => aumentarCantidad(item.nombre)}>➕</button>
                      <button onClick={() => disminuirCantidad(item.nombre)}>➖</button>
                      <button onClick={() => eliminarProducto(item.nombre)}>❌</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Total: S/ {totalCompra.toFixed(2)}
              </p>
            </>
          )}
        </aside>
      )}

      <form className="form-registro" onSubmit={handleGuardar}>
        <div className="form-row">
          <input type="text" name="nombre" placeholder="Nombre" required value={formulario.nombre} onChange={handleChange} />
          <input type="text" name="apellido" placeholder="Apellido" required value={formulario.apellido} onChange={handleChange} />
        </div>

        <div className="form-row">
          <select name="tipoDocumento" required value={formulario.tipoDocumento} onChange={handleChange}>
            <option value="">Tipo de Documento</option>
            <option value="dni">DNI</option>
            <option value="factura">Factura</option>
          </select>
          <input type="text" name="numeroDocumento" placeholder="Número Documento" required value={formulario.numeroDocumento} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="tel" name="telefono" placeholder="Teléfono" required value={formulario.telefono} onChange={handleChange} />
        </div>

        <div className="form-row radio-group">
          <label>
            <input
              type="radio"
              name="recogo"
              value="tienda"
              checked={recogo === "tienda"}
              onChange={() => setRecogo("tienda")}
            />
            Recogo en Tienda
          </label>
          <label>
            <input
              type="radio"
              name="recogo"
              value="envio"
              checked={recogo === "envio"}
              onChange={() => setRecogo("envio")}
            />
            Envío
          </label>
        </div>

        {recogo === "tienda" ? (
          <div className="form-row">
            <select name="sede" required value={formulario.sede} onChange={handleChange}>
              <option value="">Seleccione Sede</option>
              <option value="Miraflores">Miraflores</option>
              <option value="San Isidro">San Isidro</option>
              <option value="Barranco">Barranco</option>
            </select>
          </div>
        ) : (
          <div className="form-row">
            <input type="text" name="ubicacion" placeholder="Ubicación para Envío" required value={formulario.ubicacion} onChange={handleChange} />
          </div>
        )}

        <div className="form-row">
          <input type="text" name="departamento" placeholder="Departamento" required value={formulario.departamento} onChange={handleChange} />
          <input type="text" name="provincia" placeholder="Provincia" required value={formulario.provincia} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="text" name="referencia" placeholder="Referencia" required value={formulario.referencia} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-guardar">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default PaginaRegistroCompra;
