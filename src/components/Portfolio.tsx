import ProjectCard from './ProjectCard';

export default function Portfolio() {
  return (
    <section id="portfolio" className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-4xl font-bold text-white">Projects</h1>
        <p className="mt-3 max-w-2xl text-white/80">
          A mix of full-stack applications, machine learning, and data analysis
          projects.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-2 gap-6">
          <ProjectCard
            title="Project 1"
            category="Full-Stack"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget ultricies tellus, vel posuere arcu."
            tags={['React', 'TypeScript', 'Tailwind']}
            links={[
              { label: 'GitHub', url: 'https://github.com/username/project-1' },
            ]}
          />
          <ProjectCard
            title="Project 2"
            category="Machine Learning"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget ultricies tellus, vel posuere arcu."
            tags={['Python', 'Scikit-learn', 'TensorFlow']}
            links={[
              { label: 'GitHub', url: 'https://github.com/username/project-1' },
              { label: 'Demo', url: 'https://github.com/username/project-1' },
              { label: 'Live', url: 'https://github.com/username/project-1' },
            ]}
          />
          <ProjectCard
            title="Project 3"
            category="Data Analysis"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget ultricies tellus, vel posuere arcu."
            tags={['Python', 'Pandas', 'NumPy']}
            links={[
              { label: 'GitHub', url: 'https://github.com/username/project-1' },
            ]}
          />
          <ProjectCard
            title="Project 4"
            category="Full-Stack"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget ultricies tellus, vel posuere arcu."
            tags={['React', 'TypeScript', 'Tailwind']}
            links={[
              { label: 'GitHub', url: 'https://github.com/username/project-1' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
