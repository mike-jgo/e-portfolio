import {
  SiReact,
  SiTypescript,
  SiPython,
  SiLaravel,
  SiVuedotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiVite,
  SiSupabase,
  SiTensorflow,
  SiScikitlearn,
  SiDiscord,
  SiEthereum,
  SiGoogle,
  SiExpress,
  SiGit,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type TechEntry = {
  icon: IconType;
  color: string;
};

export const techIcons: Record<string, TechEntry> = {
  React: { icon: SiReact, color: '#61DAFB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  Python: { icon: SiPython, color: '#3776AB' },
  Laravel: { icon: SiLaravel, color: '#FF2D20' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  Express: { icon: SiExpress, color: '#aaaaaa' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  Vite: { icon: SiVite, color: '#646CFF' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  'Scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  'Discord.py': { icon: SiDiscord, color: '#5865F2' },
  'ethers.js': { icon: SiEthereum, color: '#627EEA' },
  Web3: { icon: SiEthereum, color: '#627EEA' },
  'Google Apps Script': { icon: SiGoogle, color: '#4285F4' },
  Git: { icon: SiGit, color: '#F05032' },
};

export const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'Laravel', 'Node.js', 'Express'],
  },
  {
    label: 'Data & ML',
    skills: ['TensorFlow', 'Scikit-learn'],
  },
  {
    label: 'Tools & Cloud',
    skills: ['Supabase', 'Git', 'ethers.js'],
  },

];
