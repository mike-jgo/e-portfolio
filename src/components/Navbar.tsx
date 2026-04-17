import { useEffect, useState } from 'react';
import { scrollTo } from '../lib/scrollTo';

const sections = ['portfolio', 'about', 'skills', 'contact'] as const;
type Section = typeof sections[number];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Section | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
        { rootMargin: '-40% 0px -50% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function linkClass(id: Section) {
    return `text-sm transition cursor-pointer ${
      active === id ? 'text-white' : 'text-white/50 hover:text-white'
    }`;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo — left */}
        <button onClick={() => scrollTo('hero')} className="flex items-center cursor-pointer" aria-label="Back to top">
          <span className="rounded border border-white/30 px-2 py-1 text-xs font-bold tracking-widest text-white transition hover:border-white/60 hover:bg-white/5">
            MJG
          </span>
        </button>

        {/* Links — center, hidden on mobile */}
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => scrollTo('portfolio')} className={linkClass('portfolio')}>Projects</button>
          <button onClick={() => scrollTo('about')} className={linkClass('about')}>About</button>
          <button onClick={() => scrollTo('skills')} className={linkClass('skills')}>Skills</button>
          <button onClick={() => scrollTo('contact')} className={linkClass('contact')}>Contact</button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href={import.meta.env.BASE_URL + 'Michael_Go_CV.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Resume
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white/50 transition hover:text-white cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-5 bg-zinc-900/95">
          <button onClick={() => { scrollTo('portfolio'); closeMenu(); }} className={linkClass('portfolio')}>Projects</button>
          <button onClick={() => { scrollTo('about'); closeMenu(); }} className={linkClass('about')}>About</button>
          <button onClick={() => { scrollTo('skills'); closeMenu(); }} className={linkClass('skills')}>Skills</button>
          <button onClick={() => { scrollTo('contact'); closeMenu(); }} className={linkClass('contact')}>Contact</button>
        </div>
      )}
    </header>
  );
}
