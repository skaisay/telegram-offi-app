import React, { useState, useEffect } from 'react';
import Articles from './components/Articles';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { About } from './components/About';
import { Navigation } from './components/Navigation';
import { MenuScreen } from './components/Menu/MenuScreen';
import { Favorites } from './components/Menu/Favorites';
import { Statistics } from './components/Menu/Statistics';
import { Notifications } from './components/Menu/Notifications';
import { Crypto } from './components/Menu/Crypto';
import { Security } from './components/Menu/Security';
import { Settings as MenuSettings } from './components/Menu/Settings';
import { About as MenuAbout } from './components/Menu/About';
import { useLanguage } from './hooks/useLanguage';
import { StarField } from './components/StarField';
import { Toast } from './components/Toast';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';

function App() {
  const [currentPage, setCurrentPage] = useState('profile'); // Changed initial page to profile
  const [showStars, setShowStars] = useState(true);
  const { currentLanguage, setLanguage } = useLanguage();
  const [menuScreen, setMenuScreen] = useState<string | null>(null);
  const { initWebApp } = useTelegramWebApp();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const cleanup = initWebApp();
    const tg = window.Telegram?.WebApp;
    
    if (tg?.initDataUnsafe?.user) {
      setUserData(tg.initDataUnsafe.user);
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [initWebApp]);

  const handleNavigate = (page: string) => {
    if (page === 'menu') {
      setMenuScreen('main');
    } else {
      setCurrentPage(page);
      setMenuScreen(null);
    }
  };

  const handleMenuNavigate = (screen: string) => {
    setMenuScreen(screen);
  };

  const handleMenuBack = () => {
    setMenuScreen('main');
  };

  const handleMainBack = () => {
    setCurrentPage('articles');
    setMenuScreen(null);
  };

  const renderContent = () => {
    if (menuScreen) {
      switch (menuScreen) {
        case 'main':
          return <MenuScreen onNavigate={handleMenuNavigate} onBack={handleMainBack} userData={userData} />;
        case 'favorites':
          return <Favorites onBack={handleMenuBack} />;
        case 'statistics':
          return <Statistics onBack={handleMenuBack} />;
        case 'notifications':
          return <Notifications onBack={handleMenuBack} />;
        case 'crypto':
          return <Crypto onBack={handleMenuBack} />;
        case 'security':
          return <Security onBack={handleMenuBack} />;
        case 'settings':
          return <MenuSettings onBack={handleMenuBack} />;
        case 'about':
          return <MenuAbout onBack={handleMenuBack} />;
        default:
          return null;
      }
    }

    switch (currentPage) {
      case 'articles':
        return <Articles initialCategory="personal" />; // Set initial category to personal
      case 'profile':
        return <Profile />;
      case 'settings':
        return (
          <Settings
            showStars={showStars}
            onToggleStars={setShowStars}
            language={currentLanguage}
            onLanguageChange={setLanguage}
            onBack={handleMainBack}
          />
        );
      case 'about':
        return <About onBack={handleMainBack} />;
      default:
        return <Profile />;
    }
  };

  const showNavigation = !menuScreen;

  return (
    <div className="bg-black text-white h-full">
      {showStars && <StarField />}
      <Toast />
      <div className="scroll-container">
        {renderContent()}
      </div>
      {showNavigation && <Navigation currentPage={currentPage} onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;