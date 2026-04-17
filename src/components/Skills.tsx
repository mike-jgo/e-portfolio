import { useFadeIn } from '../hooks/useFadeIn';
import { techIcons, skillGroups } from '../lib/techIcons';

export default function Skills() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section id="skills" className="border-t border-white/10">
      <div ref={ref} className="fade-up mx-auto max-w-5xl px-6 py-24 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center lg:text-left">
          Skills
        </h2>

        <div className="space-y-10">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => {
                  const entry = techIcons[skill];
                  if (!entry) return null;
                  const Icon = entry.icon;
                  return (
                    <div
                      key={skill}
                      className="flex flex-col items-center gap-2 rounded-xl bg-zinc-800 px-5 py-4 w-28 border border-white/5 hover:border-white/20 transition-colors"
                    >
                      <Icon style={{ color: entry.color }} className="text-3xl shrink-0" />
                      <span className="text-xs text-white/60 text-center leading-tight">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
