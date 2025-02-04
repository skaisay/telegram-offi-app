import React from 'react';
import { ArrowLeft, BookOpen, Clock, Star } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useArticles } from '../../hooks/useArticles';

interface StatisticsProps {
  onBack: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ onBack }) => {
  const { getReadingStats, savedArticles } = useArticles();
  const stats = getReadingStats();

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  };

  const statsData = [
    { 
      icon: BookOpen, 
      label: 'Прочитано статей', 
      value: stats.articlesRead.toString() 
    },
    { 
      icon: Clock, 
      label: 'Время чтения', 
      value: formatTime(stats.totalTimeSpent)
    },
    { 
      icon: Star, 
      label: 'В избранном', 
      value: savedArticles.length.toString() 
    },
  ];

  return (
    <div className="min-h-screen p-4">
      <button
        onClick={onBack}
        className="mb-6 p-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <ArrowLeft className="text-white" size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6">Статистика</h2>

      <div className="grid gap-4">
        {statsData.map(({ icon: Icon, label, value }) => (
          <GlassCard key={label} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/5 rounded-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};