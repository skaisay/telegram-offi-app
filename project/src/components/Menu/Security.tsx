import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Bell } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';

interface SecurityProps {
  onBack: () => void;
}

export const Security: React.FC<SecurityProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();

  const t = {
    en: {
      title: 'Security',
      features: [
        {
          title: 'End-to-End Encryption',
          description: 'All your data is securely encrypted',
          icon: Lock
        },
        {
          title: 'Privacy Protection',
          description: 'Your personal information is protected',
          icon: Eye
        },
        {
          title: 'Security Notifications',
          description: 'Get notified about important security events',
          icon: Bell
        }
      ]
    },
    ru: {
      title: 'Безопасность',
      features: [
        {
          title: 'Сквозное шифрование',
          description: 'Все ваши данные надёжно зашифрованы',
          icon: Lock
        },
        {
          title: 'Защита приватности',
          description: 'Ваша личная информация под защитой',
          icon: Eye
        },
        {
          title: 'Уведомления безопасности',
          description: 'Получайте уведомления о важных событиях безопасности',
          icon: Bell
        }
      ]
    }
  }[currentLanguage];

  return (
    <div className="min-h-screen p-4">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg -mx-4 px-4 py-3 mb-6">
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
  );
}