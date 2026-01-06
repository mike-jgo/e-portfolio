export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-6 py-24 flex flex-col items-center">
        <p className="font-extralight text-md text-white">Hello, I’m Michael.</p>
        <h1 className="mt-3 text-4xl font-bold text-white">
          Software Developer & Data Scientist
        </h1>
        <p className="mt-3 text-white">
          I build data-driven applications using machine learning, analytics, and full-stack tools.
        </p>

        <a
          className="mt-8 items-center rounded-md border border-white/20 px-4 py-2 text-sm
                  hover:bg-white/5 transition text-white"
          href="#projects"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}
