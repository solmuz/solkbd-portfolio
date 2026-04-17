import ScrollReveal from './ScrollReveal';
import './SobreMi.css';

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="sobre-mi">
      <ScrollReveal>
        <span className="section-eyebrow">about.md</span>
        <h2 className="section-title">
          Tecnología con <em>cuidado</em>
        </h2>
      </ScrollReveal>

      <div className="sobre-grid">
        <ScrollReveal className="sobre-bio">
          <div className="sobre-avatar">
            <img src="/images/logo-dark.png" alt="SolKBD" width="120" height="120" />
          </div>
          <p>
            Soy <strong>Jose Daniel Muñoz Martínez</strong>, desarrollador
            fullstack y DevOps radicado en <strong>Monterrey, Nuevo León</strong>.
            Construyo productos web y sistemas internos que la gente realmente
            usa — sin framework innecesario, sin abstracciones que sobran.
          </p>
          <p>
            Mi enfoque combina backend sólido (FastAPI, PostgreSQL) con
            infraestructura auto-hospedada (Docker, Nginx, homelab propio
            "solgap"). Lo que construyo lo despliego, lo monitoreo y lo mantengo.
          </p>
          <div className="sobre-links">
            <a href="https://github.com/solmuz" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.306.762-1.606-2.665-.305-5.467-1.334-5.467-5.93 0-1.312.47-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.222 0 4.61-2.807 5.625-5.48 5.92.43.372.815 1.103.815 2.222v3.293c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              github.com/solmuz
            </a>
            <a href="mailto:DanielMunoz@solkbd.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              DanielMunoz@solkbd.com
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal className="sobre-stats" stagger>
          <div className="stat-card">
            <span className="stat-label">Experiencia</span>
            <span className="stat-value">5+ años</span>
            <span className="stat-detail">construyendo software de producción</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Proyectos</span>
            <span className="stat-value">12+</span>
            <span className="stat-detail">entre clientes y homelab</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Homelab</span>
            <span className="stat-value">solgap</span>
            <span className="stat-detail">Ubuntu 24.04 · Docker · Nginx</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Ubicación</span>
            <span className="stat-value">Monterrey, MX</span>
            <span className="stat-detail">trabajo local y remoto</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
