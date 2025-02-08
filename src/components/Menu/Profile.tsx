import React, { useState } from 'react';
import { ArrowLeft, User, Camera, Edit2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';

interface ProfileProps {
  onBack: () => void;
  userData: {
    photo_url?: string;
    first_name: string;
    username?: string;
  } | null;
}

export const Profile: React.FC<ProfileProps> = ({ onBack, userData }) => {
  const { currentLanguage } = useLanguage();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData?.first_name || '');
  const [editedUsername, setEditedUsername] = useState(userData?.username || '');

  const t = {
    en: {
      title: 'Profile',
      editProfile: 'Edit Profile',
      name: 'Name',
      username: 'Username',
      save: 'Save Changes',
      cancel: 'Cancel',
      changePhoto: 'Change Photo',
      comingSoon: 'This feature will be available soon'
    },
    ru: {
      title: 'Профиль',
      editProfile: 'Редактировать профиль',
      name: 'Имя',
      username: 'Имя пользователя',
      save: 'Сохранить изменения',
      cancel: 'Отмена',
      changePhoto: 'Изменить фото',
      comingSoon: 'Эта функция будет доступна в ближайшее время'
    }
  }[currentLanguage];

  const handleSave = () => {
    addToast(t.comingSoon, 'info');
    setIsEditing(false);
  };

  const handlePhotoChange = () => {
    addToast(t.comingSoon, 'info');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg -mx-4 px-4 py-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="text-white" size={24} />
            </button>
            <h2 className="text-2xl font-bold">{t.title}</h2>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10">
              {userData?.photo_url ? (
                <img
                  src={userData.photo_url}
                  alt={userData.first_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <User className="w-16 h-16 text-white/50" />
                </div>
              )}
            </div>
            {isEditing && (
              <button
                onClick={handlePhotoChange}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-white/10 
                  backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <GlassCard variant="settings" className="p-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">{t.name}</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2
                    focus:ring-white/20 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">{t.username}</label>
                <input
                  type="text"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2
                    focus:ring-white/20 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 
                    transition-colors text-white font-medium"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 
                    transition-colors text-white/80"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">{t.name}</label>
                <p className="text-lg font-semibold">{userData?.first_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">{t.username}</label>
                <p className="text-lg font-semibold break-all">
                  @{userData?.username || ''}
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};