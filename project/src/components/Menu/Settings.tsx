import React from 'react';
import { ArrowLeft, Star, Sliders, Cpu } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();
  const [showStars, setShowStars] = React.useState(true);
  const [starDensity, setStarDensity] = React.useState(100);
  const [starSpeed, setStarSpeed] = React.useState(100);
  const [performanceMode, setPerformanceMode] = React.useState(false);

  const t = {
    en: {
      title: 'Settings',
      starAnimation: 'Star Animation',
      starDensity: 'Star Density',
      starSpeed: 'Animation Speed',
      performanceMode: 'Performance Mode',
      performanceModeDesc: 'Reduce animations for better performance',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    ru: {
      title: 'Настройки',
      starAnimation: 'Звёздная анимация',
      starDensity: 'Количество звёзд',
      starSpeed: 'Скорость анимации',
      performanceMode: 'Режим производительности',
      performanceModeDesc: 'Уменьшить анимации для лучшей производительности',
      high: 'Высокая',
      medium: 'Средняя',
      low: 'Низкая'
    }
  }[currentLanguage];

  return (
    <div className="min-h-screen p-4">
      <div className="sticky top-0 z-50 bg-black/5 backdrop-blur-lg -mx-4 px-4 py-3 mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h2 className="text-2xl font-bold">{t.title}</h2>
        </div>
      </div>

      <div className="space-y-4">
        <GlassCard variant="settings" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/5 rounded-xl">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{t.starAnimation}</h3>
                <p className="text-sm text-gray-400">Toggle background animation</p>
              </div>
            </div>
            <button
              onClick={() => setShowStars(!showStars)}
              className={`w-12 h-6 rounded-full transition-colors relative
                ${showStars ? 'bg-white/20' : 'bg-white/5'}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white transition-transform
                  ${showStars ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </GlassCard>

        {showStars && (
          <>
            <GlassCard variant="settings" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/5 rounded-xl">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.starDensity}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={starDensity}
                        onChange={(e) => setStarDensity(Number(e.target.value))}
                        className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-400 w-16 text-right">
                        {starDensity <= 60 ? t.low : starDensity >= 120 ? t.high : t.medium}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/5 rounded-xl">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.starSpeed}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={starSpeed}
                        onChange={(e) => setStarSpeed(Number(e.target.value))}
                        className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-400 w-16 text-right">
                        {starSpeed <= 60 ? t.low : starSpeed >= 120 ? t.high : t.medium}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="settings" className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/5 rounded-xl">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.performanceMode}</h3>
                    <p className="text-sm text-gray-400">{t.performanceModeDesc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPerformanceMode(!performanceMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative
                    ${performanceMode ? 'bg-white/20' : 'bg-white/5'}`}
                >
                  <div
                    className={`absolute w-5 h-5 rounded-full bg-white transition-transform
                      ${performanceMode ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </div>
  );
};