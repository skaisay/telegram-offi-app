import React from 'react';
import { BookOpen, User, Settings, Info, Menu } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'articles', icon: BookOpen, label: 'Articles' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'about', icon: Info, label: 'About' },
    { id: 'menu', icon: Menu, label: 'Menu' }
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/40 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
        <div className="flex items-center space-x-4">
          {navItems.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`p-1.5 rounded-full transition-all duration-300 ease-out transform hover:scale-110
                ${currentPage === id 
                  ? 'text-white bg-white/10 shadow-lg shadow-white/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={18} className="transform transition-transform duration-300" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};