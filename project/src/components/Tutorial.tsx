import React from 'react';
import { ArrowLeft, BookOpen, User, Settings, Info, Menu, Star, Bell, BarChart2, Coins, Search } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../hooks/useLanguage';

interface TutorialProps {
  onBack: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "How to use the app",
      sections: [
        {
          title: "Navigation",
          items: [
            { icon: BookOpen, text: "Articles - Read and save interesting articles" },
            { icon: User, text: "Profile - View your Telegram profile" },
            { icon: Settings, text: "Settings - Customize app appearance and language" },
            { icon: Info, text: "About - App information and updates" },
            { icon: Menu, text: "Menu - Access additional features" }
          ]
        },
        {
          title: "Menu Features",
          items: [
            { icon: Star, text: "Favorites - Access your saved articles" },
            { icon: Bell, text: "Notifications - Manage notification settings" },
            { icon: BarChart2, text: "Statistics - View your reading statistics" },
            { icon: Coins, text: "Cryptocurrencies - Track crypto prices" }
          ]
        },
        {
          title: "Article Features",
          items: [
            { icon: Star, text: "Save articles to favorites" },
            { icon: Search, text: "Search through articles and cryptocurrencies" },
            { icon: Bell, text: "Get notified about new articles" }
          ]
        }
      ]
    },
    ru: {
      title: "Как пользоваться приложением",
      sections: [
        {
          title: "Навигация",
          items: [
            { icon: BookOpen, text: "Статьи - Читайте и сохраняйте интересные статьи" },
            { icon: User, text: "Профиль - Просмотр вашего профиля Telegram" },
            { icon: Settings, text: "Настройки - Настройка внешнего вида и языка" },
            { icon: Info, text: "О приложении - Информация и обновления" },
            { icon: Menu, text: "Меню - Доступ к дополнительным функциям" }
          ]
        },
        {
          title: "Функции меню",
          items: [
            { icon: Star, text: "Избранное - Доступ к сохранённым статьям" },
            { icon: Bell, text: "Уведомления - Управление настройками уведомлений" },
            { icon: BarChart2, text: "Статистика - Просмотр статистики чтения" },
            { icon: Coins, text: "Криптовалюты - Отслеживание курсов криптовалют" }
          ]
        },
        {
          title: "Функции статей",
          items: [
            { icon: Star, text: "Сохраняйте статьи в избранное" },
            { icon: Search, text: "Поиск по статьям и криптовалютам" },
            { icon: Bell, text: "Получайте уведомления о новых статьях" }
          ]
        }
      ]
    }
  };

  const { title, sections } = content[currentLanguage] || content.en;

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg -mx-4 px-4 py-3 mb-6">
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

      <div className="max-w-2xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <GlassCard key={itemIndex} variant="settings" className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white/5 rounded-xl">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm">{item.text}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};