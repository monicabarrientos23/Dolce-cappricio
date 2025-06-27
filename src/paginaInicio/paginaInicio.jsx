import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './paginaInicio.css';

const PaginaInicio = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ Hook para redirección

  const manejarLogin = (e) => {
    e.preventDefault();
    if (usuario === 'moni' && clave === '1213') {
      setError('');
      navigate('/catalogo'); // ✅ Redirige al catálogo
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="pagina-inicio">
      <div className="login-container">
        <h2 className="titulo-inicio">Inicio de Sesión</h2>
        <form onSubmit={manejarLogin} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Ingresar</button>
        </form>
      </div>
      <div className="imagen-container">
        <img
          src="https://dolcecapriccio.pe/wp-content/uploads/2024/07/fre1a.jpg"
          alt="Decorativa"
        />
      </div>
    </div>
  );
};

export default PaginaInicio;
