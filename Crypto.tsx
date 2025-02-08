import React, { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, RefreshCcw, Search } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';
import { CryptoChart } from './CryptoChart';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface CryptoProps {
  onBack: () => void;
}

export const Crypto: React.FC<CryptoProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [featuredCrypto, setFeaturedCrypto] = useState<CryptoData | null>(null);

  const translations = {
    en: {
      title: 'Cryptocurrencies',
      search: 'Search cryptocurrency...',
      loading: 'Loading data...',
      error: 'Failed to load cryptocurrency data. Please try again later.',
      retry: 'Try again',
      marketCap: 'Market Cap',
      volume: 'Volume',
      holders: 'Holders',
      transactions: 'Transactions',
      spotlight: 'In Spotlight'
    },
    ru: {
      title: 'Криптовалюты',
      search: 'Поиск криптовалюты...',
      loading: 'Загрузка данных...',
      error: 'Не удалось загрузить данные. Попробуйте позже.',
      retry: 'Попробовать снова',
      marketCap: 'Капитализация',
      volume: 'Объем',
      holders: 'Холдеры',
      transactions: 'Транзакции',
      spotlight: 'В центре внимания'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=true&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }

      const data = await response.json();
      setCryptoData(data);
      setFeaturedCrypto(data[0]); // Usually Bitcoin
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error('Crypto fetch error:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(1)}B`;
    }
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    }
    if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const filteredCryptoData = cryptoData.filter(crypto => {
    const searchLower = searchQuery.toLowerCase();
    return (
      crypto.name.toLowerCase().includes(searchLower) ||
      crypto.symbol.toLowerCase().includes(searchLower)
    );
  });

  if (selectedCrypto) {
    return (
      <CryptoChart
        crypto={selectedCrypto}
        onBack={() => setSelectedCrypto(null)}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          {showSearch ? (
            <div className="flex-1 mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-white/20 focus:border-transparent"
                  autoFocus
                />
                <Search 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
            </div>
          ) : (
            <h2 className="text-2xl font-bold">{t.title}</h2>
          )}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Search size={20} className="text-white" />
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              {lastUpdate && (
                <span>
                  {lastUpdate.toLocaleTimeString()}
                </span>
              )}
              <RefreshCcw 
                size={16} 
                className={`${loading ? 'animate-spin' : ''}`} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Featured Crypto */}
        {featuredCrypto && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-400">{t.spotlight}</h3>
            <GlassCard
              variant="settings"
              className="p-4 transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setSelectedCrypto(featuredCrypto)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={featuredCrypto.image}
                  alt={featuredCrypto.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{featuredCrypto.name}</h3>
                      <p className="text-sm text-gray-400">{featuredCrypto.symbol.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-mono font-bold">
                        ${featuredCrypto.current_price.toLocaleString()}
                      </p>
                      <div
                        className={`flex items-center justify-end text-sm ${
                          featuredCrypto.price_change_percentage_24h >= 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {featuredCrypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp size={16} className="mr-1" />
                        ) : (
                          <TrendingDown size={16} className="mr-1" />
                        )}
                        {Math.abs(featuredCrypto.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-400">{t.marketCap}</p>
                      <p className="font-mono">{formatNumber(featuredCrypto.market_cap)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t.volume}</p>
                      <p className="font-mono">{formatNumber(featuredCrypto.total_volume)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Crypto List */}
        <div className="space-y-3">
          {loading && cryptoData.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-white/50">{t.loading}</div>
            </div>
          ) : error ? (
            <GlassCard variant="settings" className="p-4 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchCryptoData}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                {t.retry}
              </button>
            </GlassCard>
          ) : (
            filteredCryptoData.map((crypto) => (
              <GlassCard
                key={crypto.id}
                variant="settings"
                className="p-4 transform transition-all duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedCrypto(crypto)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{crypto.name}</h3>
                        <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-semibold">
                          ${crypto.current_price.toLocaleString()}
                        </p>
                        <div
                          className={`flex items-center justify-end text-sm ${
                            crypto.price_change_percentage_24h >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp size={16} className="mr-1" />
                          ) : (
                            <TrendingDown size={16} className="mr-1" />
                          )}
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};