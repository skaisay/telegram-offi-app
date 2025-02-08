import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const titles = {
    en: 'News Feed',
    ru: 'Новости',
    no: 'Nyheter',
    zh: '新闻'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
      <div className="h-[env(safe-area-inset-top)] bg-black" />
    </header>
  );
};