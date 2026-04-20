import { useFadeIn } from '../hooks/useFadeIn';

export default function About() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section
      id="about"
      className="border-t border-white/10"
    >
      <div ref={ref} className="fade-up mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl mx-auto text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">About Me</h2>

          <div className="text-white/70 font-light leading-relaxed space-y-4">
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
    </section>
  );
}
