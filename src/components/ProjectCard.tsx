import { useState } from 'react';
import { techIcons } from '../lib/techIcons';

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  tags?: string[];
  links?: ProjectLink[];
};

type ProjectLink = {
  label: string;
  url: string;
};

export default function ProjectCard({
  title,
  category,
  description,
  tags = [],
  links = [],
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg bg-zinc-800 p-6 transition-all duration-200 hover:-translate-y-1 hover:border hover:border-white/10">
      {/* Header — always visible. Tappable on mobile, inert on desktop. */}
      <div
        className="flex items-start justify-between cursor-pointer md:cursor-default"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="mt-0.5 text-sm font-light text-white/50">{category}</p>
        </div>

        {/* Desktop: links pinned top-right */}
        {links.length > 0 && (
          <div className="hidden md:flex gap-3 ml-4 shrink-0">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-400 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile: chevron toggle */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`md:hidden h-4 w-4 shrink-0 ml-3 mt-1 text-white/30 transition-transform duration-300 ${
            expanded ? 'rotate-180' : ''
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Body — collapsed on mobile, always open on desktop */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible md:max-h-none md:mt-3 ${
          expanded ? 'max-h-125 mt-3' : 'max-h-0'
        }`}
      >
        <p className="text-sm text-white/70 leading-relaxed">{description}</p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const entry = techIcons[tag];
              return (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  {entry && (
                    <entry.icon style={{ color: entry.color }} className="shrink-0 text-sm" />
                  )}
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Mobile: links inside expanded area */}
        {links.length > 0 && (
          <div className="mt-4 flex gap-3 md:hidden">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-400 transition hover:text-white"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
