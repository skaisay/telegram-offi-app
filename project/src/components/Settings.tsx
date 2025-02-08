import React, { useState } from 'react';
import { Globe2, ArrowLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../hooks/useLanguage';

interface SettingsProps {
  showStars: boolean;
  onToggleStars: (show: boolean) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  language,
  onLanguageChange,
  onBack
}) => {
  const [showLanguages, setShowLanguages] = useState(false);
  const { translations } = useLanguage();
  const t = translations[language];
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'no', name: 'Norsk' },
    { code: 'zh', name: '中文' },
  ];

  const currentLanguage = languages.find(l => l.code === language)?.name;

  return (
    <div className="min-h-screen p-4 space-y-4">
      <div className="sticky top-0 z-50 bg-black/5 backdrop-blur-lg -mx-4 px-4 py-3 mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h2 className="text-2xl font-bold">{t.settings}</h2>
        </div>
      </div>

      <GlassCard variant="settings" className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/5 rounded-xl">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">{t.language}</h3>
              <p className="text-sm text-gray-400">Change application language</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {currentLanguage}
            </button>
            
            {showLanguages && (
              <div className="absolute right-0 top-full mt-2 bg-black/80 backdrop-blur-lg rounded-lg
                border border-white/10 overflow-hidden min-w-[120px] z-50">
                {languages.map(({ code, name }) => (
                  <button
                    key={code}
                    onClick={() => {
                      onLanguageChange(code);
                      setShowLanguages(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};