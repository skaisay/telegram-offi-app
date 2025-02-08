import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-black/40 border-t border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-400">© 2024 Telegram App</p>
        <a
          href="https://github.com/yourusername/telegram-offi-app"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Github size={20} className="text-gray-400 hover:text-white" />
        </a>
      </div>
    </footer>
  );
};