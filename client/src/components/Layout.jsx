import { useEffect, useState } from 'react';

export default function Layout({ children, history, toggleHistory }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="p-4 space-y-4">
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="text-xl"
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
        {children}
      </div>
      <button
        onClick={toggleHistory}
        className="md:hidden fixed top-2 right-2 border px-2 py-1 rounded"
      >
        History
      </button>
      <aside className="hidden md:block border-l p-4 overflow-y-auto">{history}</aside>
    </div>
  );
}
