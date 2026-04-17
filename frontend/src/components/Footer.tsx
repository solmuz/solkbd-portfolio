import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/logo-light.png" alt="SolKBD" width="56" height="56" />
          <div className="footer-brand-text">
            <strong>SolKBD</strong>
            <em>Tecnología Artesanal</em>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#servicios">Servicios</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#stack">Stack</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="footer-direct">
          <a href="mailto:DanielMunoz@solkbd.com">DanielMunoz@solkbd.com</a>
          <a href="https://github.com/solmuz" target="_blank" rel="noopener">
            github.com/solmuz
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} SolKBD · Jose Daniel Muñoz Martínez</span>
        <span className="footer-loc">Monterrey, N.L. · México</span>
      </div>
    </footer>
  );
}
