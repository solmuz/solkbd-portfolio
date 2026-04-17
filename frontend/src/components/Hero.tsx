import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero noise">
      <div className="hero-inner">
        <img
          className="hero-logo logo-entrance"
          src="/images/logo-light.png"
          alt="SolKBD logo"
          width="140"
          height="140"
        />

        <p className="hero-tagline">Tecnología Artesanal</p>

        <h1 className="hero-name">
          Jose Daniel <em>Muñoz Martínez</em>
        </h1>

        <p className="hero-role">Desarrollador Fullstack / DevOps</p>

        <p className="hero-desc">
          Construyo sistemas a la medida para empresas que valoran el software
          bien hecho. Arquitectura limpia, infraestructura propia, entrega con
          cuidado — desde Monterrey, N.L.
        </p>

        <div className="hero-ctas">
          <a href="#servicios" className="btn btn-primary">
            Ver servicios
          </a>
          <a href="#contacto" className="btn btn-secondary">
            Contactar
          </a>
        </div>
      </div>

      <a href="#sobre-mi" className="hero-scroll scroll-indicator" aria-label="Scroll hacia abajo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
