import ScrollReveal from './ScrollReveal';
import stack from '../data/stack.json';
import './Stack.css';

type StackItem = {
  name: string;
  icon: string;
  color: string;
};

type StackGroup = {
  category: string;
  items: StackItem[];
};

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

export default function Stack() {
  return (
    <section id="stack" className="stack">
      <ScrollReveal>
        <span className="section-eyebrow">stack.json</span>
        <h2 className="section-title">
          Herramientas del <em>día a día</em>
        </h2>
        <p className="section-lede">
          El stack con el que trabajo todos los días. Elegido por confiabilidad,
          no por moda.
        </p>
      </ScrollReveal>

      <div className="stack-groups">
        {(stack as StackGroup[]).map((group) => (
          <ScrollReveal key={group.category} className="stack-group">
            <h3 className="stack-category">{group.category}</h3>
            <ul className="stack-items">
              {group.items.map((item) => (
                <li key={item.name} className="stack-item" style={{ '--tech-color': item.color } as React.CSSProperties}>
                  {item.icon ? (
                    <img
                      src={`${DEVICON_BASE}/${item.icon}`}
                      alt={item.name}
                      width="28"
                      height="28"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="stack-dot" aria-hidden="true" />
                  )}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
