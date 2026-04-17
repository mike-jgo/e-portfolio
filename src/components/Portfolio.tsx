import ProjectCard from './ProjectCard';
import { useFadeIn } from '../hooks/useFadeIn';

export default function Portfolio() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section id="portfolio" className="border-t border-white/10">
      <div ref={ref} className="fade-up mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Projects</h2>
        <p className="mt-3 max-w-2xl text-white/80">
          A mix of full-stack applications, machine learning, and research
          projects.
        </p>

        {/* 2-column grid — first 4 cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProjectCard
            title="Inventory System"
            category="Full-Stack"
            description="A full-stack inventory management system for tracking stock levels and generating reports. Built with Laravel and Vue.js using Inertia.js for seamless SPA navigation."
            tags={['Laravel', 'Vue.js', 'Inertia.js']}
          />
          <ProjectCard
            title="Thesis"
            category="Research"
            description="Research on automatic personality recognition using machine learning on Filipino Twitter data. Combines classical ML with deep learning approaches for text classification."
            tags={['Python', 'Scikit-learn', 'TensorFlow']}
          />
          <ProjectCard
            title="This E-portfolio Website"
            category="Front-end"
            description="Personal portfolio built with React and Tailwind CSS, featuring scroll-triggered animations, a responsive layout, and a skills showcase."
            tags={['React', 'Tailwind CSS']}
            links={[
              { label: 'GitHub', url: 'https://github.com/mike-jgo/e-portfolio' },
            ]}
          />
          <ProjectCard
            title="Fitlog"
            category="Full-Stack · PWA"
            description="A progressive web app for tracking workouts and visualizing fitness progress. Features authentication, a Supabase backend, and data charts. Deployed to GitHub Pages."
            tags={['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Recharts']}
            links={[
              { label: 'GitHub', url: 'https://github.com/mike-jgo/gym-app' },
              { label: 'Live', url: 'https://mike-jgo.github.io/gym-app' },
            ]}
          />
        </div>

        {/* 3-column grid — remaining cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            title="Basket"
            category="Full-Stack · Productivity"
            description="A TypeScript grocery tracker with a React frontend and a Google Apps Script + Sheets serverless backend. Uses custom hooks, a service layer, and environment-based config."
            tags={['React', 'TypeScript', 'Vite', 'Google Apps Script']}
            links={[
              { label: 'GitHub', url: 'https://github.com/mike-jgo/basket' },
            ]}
          />
          <ProjectCard
            title="Maguey Monitor"
            category="Tools · Web3"
            description="A blockchain farming dashboard that tracks on-chain token yields and exports reports. Built with a Node.js/Express backend, ethers.js for contract interactions, and a REST API."
            tags={['Node.js', 'Express', 'ethers.js', 'Web3']}
          />
          <ProjectCard
            title="Canvas Discord Bot"
            category="Tools · Automation"
            description="A Discord bot that syncs Canvas LMS course announcements and deadlines to a server channel. Uses async scheduling, deduplication, and structured logging."
            tags={['Python', 'Discord.py', 'Canvas API', 'APScheduler']}
          />
        </div>
      </div>
    </section>
  );
}
