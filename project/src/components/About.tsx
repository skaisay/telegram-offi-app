import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Star, Zap, Palette, Globe2 } from 'lucide-react';

export const About: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "About App",
      features: [
        {
          icon: Star,
          title: "Beautiful Design",
          description: "Minimalist interface with stunning star animation background"
        },
        {
          icon: Zap,
          title: "Lightning Fast",
          description: "Optimized performance for smooth scrolling and transitions"
        },
        {
          icon: Globe2,
          title: "Multi-Language",
          description: "Full support for English, Russian, Norwegian, and Chinese"
        },
        {
          icon: Palette,
          title: "Dark Theme",
          description: "Eye-friendly dark theme with perfect contrast"
        }
      ],
      version: "Version 1.0.0",
      year: "Created in 2024"
    },
    ru: {
      title: "О приложении",
      features: [
        {
          icon: Star,
          title: "Красивый дизайн",
          description: "Минималистичный интерфейс с анимацией звездного фона"
        },
        {
          icon: Zap,
          title: "Молниеносная скорость",
          description: "Оптимизированная производительность для плавной прокрутки"
        },
        {
          icon: Globe2,
          title: "Мультиязычность",
          description: "Полная поддержка английского, русского, норвежского и китайского языков"
        },
        {
          icon: Palette,
          title: "Темная тема",
          description: "Комфортная для глаз темная тема с идеальным контрастом"
        }
      ],
      version: "Версия 1.0.0",
      year: "Создано в 2024"
    }
  };

  const { title, features, version, year } = content[currentLanguage] || content.en;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-12">
      <h2 className="text-3xl font-bold">{title}</h2>
      
      <div className="grid grid-cols-1 gap-8 max-w-xl">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="flex items-start space-x-4"
            >
              <div className="p-2 bg-white/5 rounded-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-gray-400 text-sm">
        {version} • {year}
      </div>
    </div>
  );
};