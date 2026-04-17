import { useEffect, useState } from 'react';

const sections = ['portfolio', 'about', 'skills', 'contact'] as const;
type Section = typeof sections[number];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Section | null>(null);

  useEffect(() => {
    function handleScroll() {
      const hero = document.getElementById('hero');
      if (!hero) return;
      setVisible(window.scrollY >= hero.offsetHeight);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function linkClass(id: Section) {
    return `text-sm transition ${
      active === id ? 'text-white' : 'text-white/50 hover:text-white'
    }`;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo — left */}
        <a href="#hero" className="flex items-center" aria-label="Back to top">
          <span className="rounded border border-white/30 px-2 py-1 text-xs font-bold tracking-widest text-white transition hover:border-white/60 hover:bg-white/5">
            MJG
          </span>
        </a>

        {/* Links — center, hidden on mobile */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#portfolio" className={linkClass('portfolio')}>Projects</a>
          <a href="#about" className={linkClass('about')}>About</a>
          <a href="#skills" className={linkClass('skills')}>Skills</a>
          <a href="#contact" className={linkClass('contact')}>Contact</a>
        </div>

        {/* Resume — right */}
        <a
          href="/Michael_Go_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/50 transition hover:text-white"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
