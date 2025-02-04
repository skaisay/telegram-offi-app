import React, { useState } from 'react';
import { StarField } from './components/StarField';
import { Navigation } from './components/Navigation';
import { Articles } from './components/Articles';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { About } from './components/About';
import { MenuScreen } from './components/Menu/MenuScreen';
import { Favorites } from './components/Menu/Favorites';
import { Notifications } from './components/Menu/Notifications';
import { Statistics } from './components/Menu/Statistics';
import { useLanguage } from './hooks/useLanguage';
import { Toast } from './components/Toast';

function App() {
  const [currentPage, setCurrentPage] = useState('articles');
  const [menuScreen, setMenuScreen] = useState<string | null>(null);
  const [showStars, setShowStars] = useState(true);
  const { currentLanguage, setLanguage } = useLanguage();

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

  const handleBack = () => {
    setMenuScreen('main');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {showStars && <StarField />}
      <Toast />
      
      <div className="relative min-h-screen pb-20">
        <div className="h-full">
          {menuScreen ? (
            <>
              {menuScreen === 'main' && (
                <MenuScreen 
                  onNavigate={handleMenuNavigate}
                  onBack={() => setMenuScreen(null)}
                />
              )}
              {menuScreen === 'favorites' && <Favorites onBack={handleBack} />}
              {menuScreen === 'notifications' && <Notifications onBack={handleBack} />}
              {menuScreen === 'statistics' && <Statistics onBack={handleBack} />}
            </>
          ) : (
            <>
              {currentPage === 'articles' && <Articles />}
              {currentPage === 'profile' && <Profile />}
              {currentPage === 'settings' && (
                <Settings 
                  showStars={showStars} 
                  onToggleStars={setShowStars}
                  language={currentLanguage}
                  onLanguageChange={setLanguage}
                />
              )}
              {currentPage === 'about' && <About />}
            </>
          )}
        </div>
      </div>

      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

export default App