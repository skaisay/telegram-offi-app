import React, { useEffect, useState } from 'react';
import { User, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useToast } from '../hooks/useToast';

interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

export const Profile: React.FC = () => {
  const [user, setUser] = useState<TelegramUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const initTelegramUser = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        
        if (!tg) {
          throw new Error('Telegram WebApp is not available');
        }

        if (!tg.initDataUnsafe?.user) {
          addToast('Необходим доступ к данным профиля', 'error');
          setError('Для доступа к профилю необходимо разрешение');
          setLoading(false);
          return;
        }

        const userData = tg.initDataUnsafe.user;
        setUser({
          id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username,
          photo_url: userData.photo_url,
          language_code: userData.language_code
        });

      } catch (err) {
        console.error('Failed to initialize Telegram user:', err);
        setError('Не удалось загрузить данные профиля');
        addToast('Ошибка загрузки данных', 'error');
      } finally {
        setLoading(false);
      }
    };

    initTelegramUser();
  }, [addToast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-white/50">Загрузка профиля...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <GlassCard variant="settings" className="p-6 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Ошибка доступа</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Попробовать снова
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <GlassCard variant="settings" className="p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-6">
            {user?.photo_url ? (
              <img
                src={user.photo_url}
                alt={user.first_name}
                className="w-full h-full rounded-full object-cover border-2 border-white/10"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10">
                <User className="w-12 h-12 text-white/50" />
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-1">
            {user?.first_name} {user?.last_name}
          </h2>
          
          {user?.username && (
            <p className="text-gray-400 mb-4">@{user.username}</p>
          )}

          <div className="w-full space-y-3 mt-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Telegram ID</span>
              <span className="font-mono">{user?.id}</span>
            </div>
            
            {user?.language_code && (
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Язык</span>
                <span className="uppercase">{user.language_code}</span>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};