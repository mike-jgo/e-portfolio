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
  return (
    <div className="rounded-lg bg-zinc-800 p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {links.length > 0 && (
          <div className="flex gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-400 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <p className="font-light text-white">{category}</p>
      <p className="mt-2 text-white">{description}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
