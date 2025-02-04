import React, { useState } from 'react';

interface SettingsProps {
  showStars: boolean;
  onToggleStars: (show: boolean) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  showStars,
  onToggleStars,
  language,
  onLanguageChange
}) => {
  const [showLanguages, setShowLanguages] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'no', name: 'Norsk' },
    { code: 'zh', name: '中文' },
  ];

  const currentLanguage = languages.find(l => l.code === language)?.name;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="flex items-center space-x-8">
        <span className="text-lg">Star Animation</span>
        <button
          onClick={() => onToggleStars(!showStars)}
          className="text-lg px-4 py-2 rounded-full transition-all duration-300
            hover:bg-white/10 active:bg-white/20"
        >
          {showStars ? 'On' : 'Off'}
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="text-lg px-4 py-2 rounded-full transition-all duration-300
            hover:bg-white/10 active:bg-white/20"
        >
          {currentLanguage}
        </button>
        
        {showLanguages && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 py-2 
            bg-black/80 backdrop-blur-lg rounded-lg min-w-[120px]">
            {languages.map(({ code, name }) => (
              <button
                key={code}
                onClick={() => {
                  onLanguageChange(code);
                  setShowLanguages(false);
                }}
                className="w-full px-4 py-2 text-left transition-colors duration-300
                  hover:bg-white/10 active:bg-white/20"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};