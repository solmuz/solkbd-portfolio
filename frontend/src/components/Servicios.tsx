import ScrollReveal from './ScrollReveal';
import services from '../data/services.json';
import './Servicios.css';

type ServiceIcon = 'code' | 'terminal' | 'server' | 'grid' | 'compass';

type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
};

const ICONS: Record<ServiceIcon, JSX.Element> = {
  code: (
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </>
  ),
  server: (
    <>
      <rect x="2"  y="3"  width="20" height="8" rx="2" />
      <rect x="2"  y="13" width="20" height="8" rx="2" />
      <line x1="6" y1="7"  x2="6.01" y2="7" />
      <line x1="6" y1="17" x2="6.01" y2="17" />
    </>
  ),
  grid: (
    <>
      <rect x="3"  y="3"  width="7" height="7" />
      <rect x="14" y="3"  width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3"  y="14" width="7" height="7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  const content = ICONS[(name as ServiceIcon)] ?? ICONS.code;
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {content}
    </svg>
  );
}

export default function Servicios() {
  return (
    <section id="servicios" className="servicios">
      <ScrollReveal>
        <span className="section-eyebrow">services.json</span>
        <h2 className="section-title">
          Lo que <em>construyo</em> para ti
        </h2>
        <p className="section-lede">
          Cinco áreas de especialidad, pensadas para PYMEs que quieren software
          a la medida sin sobrediseñarlo.
        </p>
      </ScrollReveal>

      <ScrollReveal stagger className="servicios-grid">
        {(services as Service[]).map((s) => (
          <article key={s.id} className="servicio-card">
            <div className="servicio-icon">
              <Icon name={s.icon} />
            </div>
            <h3 className="servicio-title">{s.title}</h3>
            <p className="servicio-desc">{s.description}</p>
            <ul className="servicio-tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </ScrollReveal>
    </section>
  );
}
