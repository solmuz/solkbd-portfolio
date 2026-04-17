import { useState, type FormEvent } from 'react';
import ScrollReveal from './ScrollReveal';
import './Contacto.css';

type FormState = {
  nombre: string;
  empresa: string;
  email: string;
  asunto: string;
  mensaje: string;
  website: string; // honeypot
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: FormState = {
  nombre: '',
  empresa: '',
  email: '',
  asunto: '',
  mensaje: '',
  website: '',
};

export default function Contacto() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const update = (k: keyof FormState, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  function clientValidate(): string | null {
    if (form.nombre.trim().length < 2) return 'Tu nombre es muy corto.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Correo inválido.';
    if (form.asunto.trim().length < 3) return 'Escribe un asunto más claro.';
    if (form.mensaje.trim().length < 10) return 'El mensaje es muy corto.';
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const err = clientValidate();
    if (err) {
      setStatus('error');
      setErrorMsg(err);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? `HTTP ${res.status}`);
      }

      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar.');
    }
  }

  return (
    <section id="contacto" className="contacto">
      <ScrollReveal>
        <span className="section-eyebrow">send_message()</span>
        <h2 className="section-title">
          Trabajemos <em>juntos</em>
        </h2>
        <p className="section-lede">
          Cuéntame qué tienes en mente. Respondo al correo en menos de 24 horas
          hábiles.
        </p>
      </ScrollReveal>

      <div className="contacto-grid">
        <ScrollReveal className="contacto-info">
          <div className="info-terminal">
            <div className="terminal-bar">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="terminal-title">contact.json</span>
            </div>
            <div className="terminal-body">
              <p className="info-line">
                <span className="key">"email":</span>
                <a href="mailto:DanielMunoz@solkbd.com">DanielMunoz@solkbd.com</a>
              </p>
              <p className="info-line">
                <span className="key">"tel":</span>
                <a href="tel:+528999906007">+52 899 990 6007</a>
              </p>
              <p className="info-line">
                <span className="key">"web":</span>
                <a href="https://www.solkbd.com">www.solkbd.com</a>
              </p>
              <p className="info-line">
                <span className="key">"github":</span>
                <a href="https://github.com/solmuz" target="_blank" rel="noopener">
                  github.com/solmuz
                </a>
              </p>
              <p className="info-line">
                <span className="key">"ubicacion":</span>
                <span className="val">"Monterrey, N.L., México"</span>
              </p>
              <p className="info-line">
                <span className="key">"disponible":</span>
                <span className="val available">true</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="contacto-form-wrap">
          <form className="contacto-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <Field
                id="nombre"
                label="nombre"
                value={form.nombre}
                onChange={(v) => update('nombre', v)}
                autoComplete="name"
                required
              />
              <Field
                id="empresa"
                label="empresa"
                value={form.empresa}
                onChange={(v) => update('empresa', v)}
                autoComplete="organization"
              />
            </div>
            <Field
              id="email"
              type="email"
              label="correo"
              value={form.email}
              onChange={(v) => update('email', v)}
              autoComplete="email"
              required
            />
            <Field
              id="asunto"
              label="asunto"
              value={form.asunto}
              onChange={(v) => update('asunto', v)}
              required
            />
            <Field
              id="mensaje"
              label="mensaje"
              value={form.mensaje}
              onChange={(v) => update('mensaje', v)}
              textarea
              required
            />

            {/* honeypot — hidden from humans, visible to bots */}
            <div aria-hidden="true" className="honeypot">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update('website', e.target.value)}
                />
              </label>
            </div>

            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'enviando…' : '> enviar mensaje'}
              </button>

              {status === 'success' && (
                <span className="form-feedback success">
                  ✓ Mensaje recibido. Te responderé pronto.
                </span>
              )}
              {status === 'error' && (
                <span className="form-feedback error">
                  ✗ {errorMsg}
                </span>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  autoComplete?: string;
};

function Field({ id, label, value, onChange, type = 'text', textarea, required, autoComplete }: FieldProps) {
  const common = {
    id,
    name: id,
    value,
    required,
    autoComplete,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  };
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {textarea ? (
        <textarea className="form-input form-textarea" rows={5} {...common} />
      ) : (
        <input className="form-input" type={type} {...common} />
      )}
    </div>
  );
}
