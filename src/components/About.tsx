import { useFadeIn } from '../hooks/useFadeIn';

export default function About() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section
      id="about"
      className="border-t border-white/10"
    >
      <div ref={ref} className="fade-up mx-auto max-w-5xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <img
              src={import.meta.env.BASE_URL + '1x1_Michael.jpg'}
              alt="Michael Go — Software Developer & Data Scientist"
              loading="lazy"
              width={320}
              height={320}
              className="h-64 w-64 lg:h-80 lg:w-80 rounded-2xl object-cover shadow-2xl border border-white/10"
            />
          </div>

          <div className="lg:col-span-7 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">About Me</h2>

            <div className="text-white/70 font-light leading-relaxed space-y-4 max-w-2xl">
              <p>
                Currently in my final year at De La Salle University, taking up
                a Bachelor's Degree in Computer Science, majoring in Software
                Technology and minoring in Data Science. I am driven by the
                belief that technology should act as a spark for human
                intelligence, empowering users to do more with their own heads
                than having dependency on machines.
              </p>
              <p>
                I have a passion for creating applications that improve the
                quality of life of people. Especially in places where technology
                should be readily available but is inaccessible due to financial
                constraints or a lack of familiarity.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
