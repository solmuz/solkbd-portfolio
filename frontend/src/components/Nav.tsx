import { useEffect, useState } from 'react';
import './Nav.css';

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack', label: 'Stack' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-brand" href="#">
        <img src="/images/logo-dark.png" alt="SolKBD" width="36" height="36" />
        <span className="nav-brand-text">
          <strong>SolKBD</strong>
          <em>Tecnología Artesanal</em>
        </span>
      </a>

      <button
        className="nav-toggle"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
