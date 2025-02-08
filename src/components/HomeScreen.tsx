import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price_usd: string;
  percent_change_24h: string;
}

export const HomeScreen: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const cryptoRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch crypto data
  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://api.coinlore.net/api/tickers/');
      const data = await response.json();
      
      // Filter for popular and meme coins
      const popularCoins = data.data.filter((coin: any) => {
        const symbol = coin.symbol.toLowerCase();
        return ['btc', 'eth', 'doge', 'shib', 'pepe'].includes(symbol);
      });
      
      setCryptoData(popularCoins);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setLoading(false);
    }
  };

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch crypto data initially and every 5 minutes
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle touch events for smooth scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (cryptoRef.current) {
      if (isLeftSwipe) {
        cryptoRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      } else if (isRightSwipe) {
        cryptoRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Crypto Ticker */}
      <div className="p-4">
        <div 
          ref={cryptoRef}
          className="overflow-x-auto scrollbar-hide touch-pan-x"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex space-x-4 min-w-max">
            {loading ? (
              <div className="flex items-center justify-center w-full p-4">
                <div className="animate-pulse text-white/50">Loading...</div>
              </div>
            ) : (
              cryptoData.map((coin) => (
                <div
                  key={coin.id}
                  className="p-3 min-w-[160px] rounded-xl bg-white/5 backdrop-blur-sm border border-white/10
                    transform transition-transform hover:scale-105"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{coin.symbol}</span>
                      <span className="text-sm text-gray-400">{coin.name}</span>
                    </div>
                    <div className="text-lg font-mono font-semibold mb-1">
                      ${parseFloat(coin.price_usd).toFixed(2)}
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        parseFloat(coin.percent_change_24h) >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {parseFloat(coin.percent_change_24h) >= 0 ? (
                        <TrendingUp size={16} className="mr-1" />
                      ) : (
                        <TrendingDown size={16} className="mr-1" />
                      )}
                      {Math.abs(parseFloat(coin.percent_change_24h)).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Digital Clock */}
        <div className="aspect-square max-w-[200px] mx-auto p-6 rounded-2xl bg-white/5 backdrop-blur-sm 
          border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <Clock className="w-8 h-8 text-white/80 mx-auto mb-3" />
            <div className="text-3xl font-mono font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80"
            alt="Crypto Trading"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-white/90">
              Crypto Market Overview
            </h2>
            <p className="text-white/60">
              Stay updated with the latest trends and market movements in the crypto world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};