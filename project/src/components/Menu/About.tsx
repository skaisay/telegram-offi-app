import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Star, Zap, Download, Share2, Globe2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();
  const { addToast } = useToast();
  const [countdown, setCountdown] = useState({
    hours: 170,
    minutes: 0,
    seconds: 0
  });

  const t = {
    en: {
      title: 'About App',
      version: 'Version 2.0',
      features: [
        {
          icon: Star,
          title: 'Beautiful Design',
          description: 'Modern interface with stunning animations'
        },
        {
          icon: Globe2,
          title: 'Multi-language',
          description: 'Support for multiple languages'
        },
        {
          icon: Download,
          title: 'Offline Mode',
          description: 'Access content without internet'
        },
        {
          icon: Share2,
          title: 'Enhanced Sharing',
          description: 'Share to Telegram and social media'
        },
        {
          icon: Zap,
          title: 'Real-time Updates',
          description: 'Live cryptocurrency data'
        }
      ],
      updateTitle: 'Major Update Coming',
      updateDesc: 'Exciting Telegram integration features',
      timeRemaining: 'Time remaining',
      tapForPreview: 'Tap to preview'
    },
    ru: {
      title: 'О приложении',
      version: 'Версия 2.0',
      features: [
        {
          icon: Star,
          title: 'Красивый дизайн',
          description: 'Современный интерфейс с анимациями'
        },
        {
          icon: Globe2,
          title: 'Мультиязычность',
          description: 'Поддержка нескольких языков'
        },
        {
          icon: Download,
          title: 'Офлайн режим',
          description: 'Доступ к контенту без интернета'
        },
        {
          icon: Share2,
          title: 'Удобный шеринг',
          description: 'Публикация в Telegram и соцсетях'
        },
        {
          icon: Zap,
          title: 'Обновления в реальном времени',
          description: 'Актуальные данные криптовалют'
        }
      ],
      updateTitle: 'Готовится крупное обновление',
      updateDesc: 'Новые функции интеграции с Telegram',
      timeRemaining: 'Осталось времени',
      tapForPreview: 'Нажмите для предпросмотра'
    }
  }[currentLanguage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCountdownClick = () => {
    addToast(t.updateDesc, 'success');
  };

  return (
    <div className="min-h-screen p-4 pb-24">
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

      <div className="space-y-6">
        {/* Version */}
        <GlassCard variant="settings" className="p-4">
          <h3 className="text-xl font-bold mb-2">{t.version}</h3>
        </GlassCard>

        {/* Countdown Timer */}
        <GlassCard 
          variant="settings" 
          className="p-4"
          onClick={handleCountdownClick}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span>{t.updateTitle}</span>
            </div>
            <div className="font-mono text-2xl font-bold">
              {String(countdown.hours).padStart(2, '0')}:
              {String(countdown.minutes).padStart(2, '0')}:
              {String(countdown.seconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-gray-400">{t.tapForPreview}</p>
          </div>
        </GlassCard>

        {/* Features */}
        <div className="space-y-4">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={index} variant="settings" className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white/5 rounded-xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};