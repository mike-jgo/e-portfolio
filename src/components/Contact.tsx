import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const EMAIL = 'michaeljgo33@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useFadeIn<HTMLDivElement>();

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <section id="contact" className="border-t border-white/10">
      <div ref={ref} className="fade-up mx-auto max-w-5xl px-6 py-24 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Get in Touch</h2>
        <p className="mt-4 max-w-md text-white/60 leading-relaxed">
          I'm currently open to new opportunities. Whether it's a question or a
          project, feel free to reach out.
        </p>

        {/* Email */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-5 py-3">
          <span className="text-sm text-white/80 break-all">{EMAIL}</span>
          <button
            onClick={copyEmail}
            className="rounded-md border border-white/20 px-3 py-1 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Social links */}
        <div className="mt-6 flex gap-4">
          <a
            href="https://linkedin.com/in/michaeljgo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mike-jgo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            GitHub
          </a>
        </div>

        {/* Back to top */}
        <div className="mt-16 flex justify-center">
          <a
            href="#hero"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/5"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}