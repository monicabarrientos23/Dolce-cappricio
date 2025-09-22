import React from "react";
import "./paginaInicio.css";

const PaginaInicio = () => {
  return (
    <div className="pagina-inicio">
      {/* PRIMERA SECCIÓN - Historia e Imagen */}
      <div className="historia-container hover-efecto">
        <div className="contenido-inicio">
          <h2>Bienvenido a Dolce Capriccio</h2>
          <div className="separador">🍰 🍰 🍰 🍰 🍰</div>
          <p>
            Dolce Capriccio es una reconocida pastelería peruana fundada en el año 2000 en
            Miraflores. Se especializa en postres artesanales elaborados con ingredientes
            naturales, destacando por su torta de chocolate, rollo de chirimoya y cheesecake.
            Con una esencia familiar, cuenta con cinco locales en Lima y un moderno centro de
            producción. Además, ofrece opciones saludables para celíacos y diabéticos,
            manteniéndose innovadora y cercana a sus clientes.
          </p>
        </div>
        <div className="imagen-container">
          <img
            src="https://www.ernestojerardo.com/wp-content/uploads/2022/09/2-3-scaled.jpg"
            alt="Pastel decorativo"
          />
        </div>
      </div>

      {/* SEGUNDA SECCIÓN - Misión, Visión, ¿Qué buscamos? */}
      <div className="mision-vision-container fade-in">
        <div className="card">
          <h3>Nuestra Misión</h3>
          <p>
            Brindar a nuestros clientes productos de pastelería y panadería artesanal
            de alta calidad, elaborados con ingredientes frescos y técnicas tradicionales,
            ofreciendo un servicio amable y personalizado que satisfaga sus gustos y necesidades,
            garantizando frescura, sabor y presentación en cada producto.
          </p>
        </div>
        <div className="card">
          <h3>Nuestra Visión</h3>
          <p>
            Ser reconocidos como la pastelería líder en la región, destacándose por nuestra
            innovación, calidad y compromiso con la satisfacción del cliente, expandiendo nuestra
            presencia y consolidando una marca confiable que promueva la cultura gastronómica local
            y el desarrollo sostenible.
          </p>
        </div>
        <div className="card">
          <h3>¿Qué buscamos como empresa?</h3>
          <p>
            Nuestro propósito es inspirar a nuestro equipo a alcanzar todo su potencial y ayudarlos
            a cumplir sus metas y sueños.
          </p>
        </div>
      </div>

      {/* TERCERA SECCIÓN - Frase, Testimonio, Contador */}
      <div className="lema-testimonio fade-in">
        <div className="lema">
          <h2>“Endulzando tu día desde el 2000”</h2>
        </div>
        <div className="testimonio">
          <p>
            “Sus pasteles de chocolate son los mejores. ¡Siempre vuelvo!” 
            lo dice mi fan numero uno - Mi negro .
          </p>
        </div>
        <div className="contador">
          <p>Más de 25 años endulzando Lima | 140 colaboradores | 5 locales.</p>
        </div>
      </div>
    </div>
  );
};

export default PaginaInicio;

