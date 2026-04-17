import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  stagger?: boolean;
  className?: string;
  threshold?: number;
};

export default function ScrollReveal({
  children,
  stagger = false,
  className = '',
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, visible]);

  const classes = [
    stagger ? 'reveal-stagger' : 'reveal',
    visible ? 'visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
