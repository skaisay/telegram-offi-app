import React from 'react';
import { Star, Bell, BarChart2, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../GlassCard';

interface MenuScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onNavigate, onBack }) => {
  const menuItems = [
    { id: 'favorites', icon: Star, label: 'Избранное', description: 'Сохранённые статьи' },
    { id: 'notifications', icon: Bell, label: 'Уведомления', description: 'Настройка уведомлений' },
    { id: 'statistics', icon: BarChart2, label: 'Статистика', description: 'Ваша активность' },
  ];

  return (
    <div className="min-h-screen p-4">
      <button
        onClick={onBack}
        className="mb-6 p-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <ArrowLeft className="text-white" size={24} />
      </button>

      <div className="space-y-4">
        {menuItems.map(({ id, icon: Icon, label, description }) => (
          <GlassCard key={id} className="p-4">
            <button
              onClick={() => onNavigate(id)}
              className="w-full flex items-center space-x-4 text-left"
            >
              <div className="p-2 bg-white/5 rounded-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{label}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};