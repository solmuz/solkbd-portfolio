import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import projects from '../data/projects.json';
import './Proyectos.css';

type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  status: string;
  repo: string | null;
  tags: string[];
};

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
};

const LANG_COLORS: Record<string, string> = {
  Python:     '#3776AB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Shell:      '#89E051',
  HTML:       '#E34F26',
  CSS:        '#1572B6',
  Go:         '#00ADD8',
  Rust:       '#DEA584',
  Java:       '#B07219',
  'C++':      '#F34B7D',
  C:          '#555555',
};

function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('producción') || s.includes('operativo')) return 'var(--accent)';
  if (s.includes('desarrollo')) return 'var(--muted)';
  return 'var(--text-muted)';
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
}

export default function Proyectos() {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [ghError, setGhError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/github-repos');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: GithubRepo[] = await res.json();
        if (!cancelled) setRepos(data);
      } catch (err) {
        if (!cancelled) {
          setGhError(err instanceof Error ? err.message : 'unknown');
          setRepos([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="proyectos" className="proyectos">
      <ScrollReveal>
        <span className="section-eyebrow">projects.json</span>
        <h2 className="section-title">
          Proyectos <em>destacados</em>
        </h2>
        <p className="section-lede">
          Sistemas reales en producción — fullstack, DevOps e infraestructura
          propia. Cada uno con su contexto técnico y de negocio.
        </p>
      </ScrollReveal>

      <ScrollReveal stagger className="proyectos-grid">
        {(projects as Project[]).map((p) => (
          <article key={p.id} className="proyecto-card">
            <header className="proyecto-header">
              <h3>{p.name}</h3>
              <span className="proyecto-status" style={{ color: statusColor(p.status) }}>
                <span className="status-dot" />
                {p.status}
              </span>
            </header>

            <p className="proyecto-desc">{p.description}</p>

            <ul className="proyecto-stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <footer className="proyecto-footer">
              <div className="proyecto-tags">
                {p.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
              {p.repo && (
                <a className="proyecto-link" href={p.repo} target="_blank" rel="noopener">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.306.762-1.606-2.665-.305-5.467-1.334-5.467-5.93 0-1.312.47-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.222 0 4.61-2.807 5.625-5.48 5.92.43.372.815 1.103.815 2.222v3.293c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Ver en GitHub
                </a>
              )}
            </footer>
          </article>
        ))}
      </ScrollReveal>

      {/* ── GitHub repos (dynamic) ── */}
      <ScrollReveal>
        <h3 className="gh-heading">
          <span className="mono">$ curl github.com/solmuz/repos</span>
        </h3>
        <p className="section-lede gh-lede">
          Repositorios activos desde la API de GitHub — actualizados cada hora.
        </p>
      </ScrollReveal>

      <div className="gh-grid">
        {repos === null && <GhSkeleton count={6} />}

        {repos && repos.length === 0 && !ghError && (
          <p className="gh-empty">No hay repositorios públicos aún.</p>
        )}

        {ghError && (
          <div className="gh-error">
            <strong>API no disponible.</strong>
            <span className="mono">{ghError}</span>
            <em>El backend FastAPI estará activo en producción — se mostrarán los repos automáticamente.</em>
          </div>
        )}

        {repos &&
          repos.map((r) => (
            <a key={r.name} className="gh-card" href={r.html_url} target="_blank" rel="noopener">
              <div className="gh-card-head">
                <span className="gh-repo-name">{r.name}</span>
                {r.language && (
                  <span className="gh-lang">
                    <span
                      className="gh-lang-dot"
                      style={{ background: LANG_COLORS[r.language] ?? '#999' }}
                    />
                    {r.language}
                  </span>
                )}
              </div>
              <p className="gh-desc">{r.description ?? 'Sin descripción.'}</p>
              <div className="gh-meta">
                <span>actualizado {formatDate(r.updated_at)}</span>
              </div>
            </a>
          ))}
      </div>
    </section>
  );
}

function GhSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="gh-card gh-skeleton" aria-hidden="true">
          <div className="sk-line w60" />
          <div className="sk-line w90" />
          <div className="sk-line w40" />
        </div>
      ))}
    </>
  );
}
