import { scrollTo } from '../lib/scrollTo';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient background */}
      <div
        className="animate-glow-pulse pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24 flex flex-col items-center text-center">
        <p className="font-extralight text-sm tracking-widest text-white/50 uppercase">
          Hello, I'm Michael.
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Software Developer &amp; Data Scientist
        </h1>
        <p className="mt-4 max-w-xl text-white/60 leading-relaxed">
          I build data-driven applications from full-stack web apps to machine learning pipelines.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo('portfolio')}
            className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white/90 cursor-pointer"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5 cursor-pointer"
          >
            Contact Me
          </button>
          <a
            href={import.meta.env.BASE_URL + 'Michael_Go_CV.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-indigo-500/50 px-5 py-2.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/10 hover:border-indigo-400"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </section>
  );
}