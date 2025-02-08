import React from 'react';
import { ArrowLeft, Star, Zap, Palette, Heart, Share2, Download, BookOpen, History, GraduationCap } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { GlassCard } from './GlassCard';
import { useAppVersion } from '../hooks/useAppVersion';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();
  const { changes } = useAppVersion();

  const content = {
    en: {
      title: "About App",
      features: [
        {
          icon: Star,
          title: "Beautiful Design",
          description: "Minimalist interface with stunning animations"
        },
        {
          icon: Share2,
          title: "Enhanced Sharing",
          description: "Share to Telegram, Stories, and social media"
        },
        {
          icon: Download,
          title: "Offline Access",
          description: "Read articles without internet connection"
        },
        {
          icon: History,
          title: "Version History",
          description: "Track all app updates and changes"
        }
      ],
      changelog: "Changelog",
      version: "Version",
      tutorial: "Tutorial",
      tutorialDesc: "Learn how to use the app"
    },
    ru: {
      title: "О приложении",
      features: [
        {
          icon: Star,
          title: "Красивый дизайн",
          description: "Минималистичный интерфейс с анимациями"
        },
        {
          icon: Share2,
          title: "Удобный шеринг",
          description: "Публикация в Telegram, историях и соцсетях"
        },
        {
          icon: Download,
          title: "Офлайн доступ",
          description: "Читайте статьи без интернета"
        },
        {
          icon: History,
          title: "История версий",
          description: "Отслеживайте все обновления"
        }
      ],
      changelog: "История изменений",
      version: "Версия",
      tutorial: "Обучение",
      tutorialDesc: "Узнайте, как пользоваться приложением"
    }
  };

  const { features, changelog, version, tutorial, tutorialDesc, title } = content[currentLanguage] || content.en;

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
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <GlassCard variant="settings" className="p-4">
          <button
            className="w-full flex items-center space-x-3"
          >
            <div className="p-2 bg-white/5 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">{tutorial}</h3>
              <p className="text-sm text-gray-400">{tutorialDesc}</p>
            </div>
          </button>
        </GlassCard>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={index} variant="settings" className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 rounded-xl">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">{changelog}</h2>
          <div className="space-y-4">
            {changes.map((change) => (
              <GlassCard key={change.version} variant="settings" className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {version} {change.version}
                    </h3>
                    <span className="text-sm text-gray-400">{change.date}</span>
                  </div>
                  <ul className="space-y-1">
                    {change.changes.map((item, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};