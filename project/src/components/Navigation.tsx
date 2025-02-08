import React from 'react';
import { BookOpen, User, Settings, Info, Menu } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const { currentLanguage } = useLanguage();

  const navItems = [
    { 
      id: 'articles', 
      icon: BookOpen, 
      label: currentLanguage === 'ru' ? 'Статьи' : 'Articles' 
    },
    { 
      id: 'profile', 
      icon: User, 
      label: currentLanguage === 'ru' ? 'Профиль' : 'Profile' 
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: currentLanguage === 'ru' ? 'Настройки' : 'Settings' 
    },
    { 
      id: 'about', 
      icon: Info, 
      label: currentLanguage === 'ru' ? 'О приложении' : 'About' 
    },
    { 
      id: 'menu', 
      icon: Menu, 
      label: currentLanguage === 'ru' ? 'Меню' : 'Menu' 
    }
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/40 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
        <div className="flex items-center space-x-6">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`group relative p-2 rounded-full transition-all duration-300 ease-out transform hover:scale-110
                ${currentPage === id 
                  ? 'text-white bg-white/10 shadow-lg shadow-white/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={20} className="transform transition-transform duration-300" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 
                bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                transition-opacity whitespace-nowrap pointer-events-none">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};