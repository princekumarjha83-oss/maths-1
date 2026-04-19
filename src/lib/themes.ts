export interface Theme {
  id: string;
  name: string;
  bg: string;
  card: string;
  accent: string;
  text: string;
  secondaryText: string;
  font: string;
}

export const THEMES: Theme[] = [
  {
    id: 'sleek',
    name: 'Sleek Interface',
    bg: 'bg-[#0F172A]',
    card: 'bg-[#1E293B]',
    accent: 'text-[#38BDF8]',
    text: 'text-[#F8FAFC]',
    secondaryText: 'text-[#94A3B8]',
    font: 'font-sans'
  },
  {
    id: 'neon',
    name: 'Neon Math',
    bg: 'bg-slate-950',
    card: 'bg-slate-900/50',
    accent: 'text-cyan-400',
    text: 'text-white',
    secondaryText: 'text-slate-400',
    font: 'font-sans'
  },
  {
    id: 'space',
    name: 'Space 🚀',
    bg: 'bg-indigo-950',
    card: 'bg-indigo-900/40',
    accent: 'text-purple-400',
    text: 'text-white',
    secondaryText: 'text-indigo-300',
    font: 'font-sans'
  },
  {
    id: 'temple',
    name: 'Temple 🛕',
    bg: 'bg-orange-950',
    card: 'bg-orange-900/30',
    accent: 'text-yellow-500',
    text: 'text-orange-50',
    secondaryText: 'text-orange-300',
    font: 'font-serif'
  },
  {
    id: 'kids',
    name: 'Kids 🎈',
    bg: 'bg-sky-400',
    card: 'bg-white/80',
    accent: 'text-pink-500',
    text: 'text-sky-900',
    secondaryText: 'text-sky-700',
    font: 'font-sans'
  }
];
