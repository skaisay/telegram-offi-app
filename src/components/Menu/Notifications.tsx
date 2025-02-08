import React, { useState } from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { GlassCard } from '../GlassCard';

interface NotificationsProps {
  onBack: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div className="min-h-screen p-4">
      <button
        onClick={onBack}
        className="mb-6 p-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <ArrowLeft className="text-white" size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6">Уведомления</h2>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/5 rounded-xl">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Push-уведомления</h3>
              <p className="text-sm text-gray-400">Получать уведомления о новых статьях</p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative
              ${notificationsEnabled ? 'bg-white/20' : 'bg-white/5'}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white transition-transform
                ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};