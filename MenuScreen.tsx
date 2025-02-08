import React, { useState } from 'react';
import { Settings, Info, Shield, MessageCircle, Star, Bell, BarChart2, Coins, User, ArrowLeft, Wallet, Gift, CheckCircle } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';
import { Profile } from './Profile';
import { useToast } from '../../hooks/useToast';
import { useWallet } from '../../hooks/useWallet';

interface MenuScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  userData: {
    photo_url?: string;
    first_name: string;
    username?: string;
  } | null;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onNavigate, onBack, userData }) => {
  const { currentLanguage } = useLanguage();
  const { addToast } = useToast();
  const { address, setAddress, isConnecting } = useWallet();
  const [showProfile, setShowProfile] = useState(false);
  const [walletInput, setWalletInput] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    const walletAddress = prompt(currentLanguage === 'ru' ? 'Введите адрес кошелька' : 'Enter wallet address');
    if (walletAddress) {
      setAddress(walletAddress);
      setIsWalletConnected(true);
      addToast(currentLanguage === 'ru' ? 'Кошелёк успешно подключен' : 'Wallet successfully connected', 'success');
    }
  };

  const handleDonation = () => {
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      addToast('Telegram WebApp is not available', 'error');
      return;
    }

    try {
      tg.showPopup({
        title: currentLanguage === 'ru' ? 'Поддержать проект' : 'Support the Project',
        message: currentLanguage === 'ru' 
          ? 'Выберите количество звёзд для поддержки проекта' 
          : 'Choose the number of stars to support the project',
        buttons: [
          {
            id: "stars_100",
            type: "default",
            text: "100 ⭐️"
          },
          {
            id: "stars_10",
            type: "default",
            text: "10 ⭐️"
          }
        ]
      }, (buttonId) => {
        if (!buttonId) return;
        
        const amount = buttonId === 'stars_100' ? 10000 : 50000;
        
        tg.openInvoice({
          title: currentLanguage === 'ru' ? "Поддержка проекта" : "Support the Project",
          description: currentLanguage === 'ru' 
            ? "Пожертвование для развития приложения" 
            : "Donation to support app development",
          payload: `donation_${Date.now()}`,
          provider_token: "381764678:TEST:51835",
          currency: "XTR",
          prices: [{
            label: currentLanguage === 'ru' ? "Пожертвование" : "Donation",
            amount: amount
          }]
        }, (success) => {
          if (success) {
            addToast(
              currentLanguage === 'ru' 
                ? 'Спасибо за поддержку!' 
                : 'Thank you for your support!',
              'success'
            );
          }
        });
      });
    } catch (error) {
      console.error('Donation error:', error);
      addToast(
        currentLanguage === 'ru' 
          ? 'Ошибка при открытии платежа' 
          : 'Error opening payment',
        'error'
      );
    }
  };

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} userData={userData} />;
  }

  const t = {
    en: {
      menu: 'Menu',
      settings: 'Settings',
      settingsDesc: 'Language and interface settings',
      about: 'About App',
      aboutDesc: 'Information and updates',
      security: 'Security',
      securityDesc: 'Animation and additional features',
      contact: 'Contact Us',
      contactDesc: 'Get in touch with us',
      favorites: 'Favorites',
      favoritesDesc: 'Saved articles',
      notifications: 'Notifications',
      notificationsDesc: 'Manage notifications',
      statistics: 'Statistics',
      statisticsDesc: 'View your activity',
      crypto: 'Cryptocurrencies',
      cryptoDesc: 'Track crypto prices',
      wallet: 'Connect Wallet',
      walletDesc: 'Connect your Telegram Wallet',
      walletConnected: 'Wallet Connected',
      donate: 'Donate Stars',
      donateDesc: 'Support with Telegram Stars',
      new: 'NEW',
      comingSoon: 'This feature will be available in 180 hours and 30 days'
    },
    ru: {
      menu: 'Меню',
      settings: 'Настройки',
      settingsDesc: 'Язык и настройки интерфейса',
      about: 'О приложении',
      aboutDesc: 'Информация и обновления',
      security: 'Безопасность',
      securityDesc: 'Анимация и дополнительные функции',
      contact: 'Связаться с нами',
      contactDesc: 'Написать разработчикам',
      favorites: 'Избранное',
      favoritesDesc: 'Сохранённые статьи',
      notifications: 'Уведомления',
      notificationsDesc: 'Управление уведомлениями',
      statistics: 'Статистика',
      statisticsDesc: 'Ваша активность',
      crypto: 'Криптовалюты',
      cryptoDesc: 'Курсы криптовалют',
      wallet: 'Подключить кошелёк',
      walletDesc: 'Подключите ваш Telegram Wallet',
      walletConnected: 'Кошелёк подключен',
      donate: 'Пожертвовать звёзды',
      donateDesc: 'Поддержать звёздами Telegram',
      new: 'НОВОЕ',
      comingSoon: 'Эта функция будет доступна через 180 часов и 30 дней'
    }
  }[currentLanguage];

  const handleContactClick = () => {
    addToast(t.comingSoon, 'info');
  };

  const menuItems = [
    { id: 'settings', icon: Settings, label: t.settings, description: t.settingsDesc },
    { id: 'about', icon: Info, label: t.about, description: t.aboutDesc },
    { id: 'security', icon: Shield, label: t.security, description: t.securityDesc },
    { 
      id: 'contact', 
      icon: MessageCircle, 
      label: t.contact, 
      description: t.contactDesc, 
      isNew: true,
      onClick: handleContactClick 
    },
    { id: 'favorites', icon: Star, label: t.favorites, description: t.favoritesDesc },
    { id: 'notifications', icon: Bell, label: t.notifications, description: t.notificationsDesc },
    { id: 'statistics', icon: BarChart2, label: t.statistics, description: t.statisticsDesc },
    { id: 'crypto', icon: Coins, label: t.crypto, description: t.cryptoDesc }
  ];

  return (
    <div className="min-h-screen">
      <div className="header-container">
        <div className="header-content">
          <button
            onClick={onBack}
            className="back-button"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h2 className="text-2xl font-bold">{t.menu}</h2>
        </div>
      </div>

      <div className="pt-[calc(var(--safe-area-top)+4rem)] px-4 pb-24">
        {/* User Profile Header */}
        <GlassCard variant="menu" className="p-4 mb-6">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center space-x-4"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0">
              {userData?.photo_url ? (
                <img
                  src={userData.photo_url}
                  alt={userData.first_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <User className="w-8 h-8 text-white/50" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold truncate">{userData?.first_name}</h3>
              {userData?.username && (
                <p className="text-gray-400 truncate">@{userData.username}</p>
              )}
            </div>
          </button>
        </GlassCard>

        {/* Wallet Connection */}
        <GlassCard variant="menu" className="p-4 mb-6">
          <button
            onClick={handleWalletConnect}
            className="w-full flex items-center space-x-4 text-left relative overflow-hidden"
            disabled={isConnecting}
          >
            <div className="p-2 bg-white/5 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-white">
                  {address ? t.walletConnected : t.wallet}
                </h3>
                {isWalletConnected && (
                  <CheckCircle className="ml-2 text-green-500" size={16} />
                )}
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-white/10 rounded-full animate-pulse">
                  {t.new}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {address ? address.slice(0, 6) + '...' + address.slice(-4) : t.walletDesc}
              </p>
            </div>
            {isConnecting && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </button>
        </GlassCard>

        {/* Donation Button */}
        <GlassCard variant="menu" className="p-4 mb-6">
          <button
            onClick={handleDonation}
            className="w-full flex items-center space-x-4 text-left"
          >
            <div className="p-2 bg-white/5 rounded-xl">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-white">{t.donate}</h3>
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-white/10 rounded-full animate-pulse">
                  {t.new}
                </span>
              </div>
              <p className="text-sm text-gray-400">{t.donateDesc}</p>
            </div>
          </button>
        </GlassCard>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map(({ id, icon: Icon, label, description, isNew, onClick }) => (
            <GlassCard key={id} variant="menu" className="p-4">
              <button
                onClick={() => onClick ? onClick() : onNavigate(id)}
                className="w-full flex items-center space-x-4 text-left"
              >
                <div className="p-2 bg-white/5 rounded-xl">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-white">{label}</h3>
                    {isNew && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-white/10 rounded-full">
                        {t.new}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};