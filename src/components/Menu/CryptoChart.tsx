import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, LineData } from 'lightweight-charts';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';

interface CryptoChartProps {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
  };
  onBack: () => void;
}

interface PriceData {
  time: number;
  value: number;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({ crypto, onBack }) => {
  const { currentLanguage } = useLanguage();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [series, setSeries] = useState<ISeriesApi<'Line'> | null>(null);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '1M' | '6M'>('6M');

  const t = {
    en: {
      marketCap: 'Market Cap',
      volume: '24h Volume',
      price: 'Price',
      loading: 'Loading chart data...',
      error: 'Failed to load chart data',
      timeframes: {
        '1D': '1 Day',
        '7D': '7 Days',
        '1M': '1 Month',
        '6M': '6 Months'
      }
    },
    ru: {
      marketCap: 'Капитализация',
      volume: 'Объем 24ч',
      price: 'Цена',
      loading: 'Загрузка графика...',
      error: 'Ошибка загрузки данных',
      timeframes: {
        '1D': '1 День',
        '7D': '7 Дней',
        '1M': '1 Месяц',
        '6M': '6 Месяцев'
      }
    }
  }[currentLanguage];

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const days = timeframe === '1D' ? 1 : timeframe === '7D' ? 7 : timeframe === '1M' ? 30 : 180;
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=${days}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch historical data');
        }

        const data = await response.json();
        const chartData = data.prices.map(([time, price]: [number, number]) => ({
          time: time / 1000,
          value: price
        }));

        setPriceData(chartData);
        setError(null);
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [crypto.id, timeframe]);

  useEffect(() => {
    if (!chartContainerRef.current || !priceData.length) return;

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      crosshair: {
        vertLine: {
          color: 'rgba(255, 255, 255, 0.4)',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: 'rgba(255, 255, 255, 0.4)',
          width: 1,
          style: 3,
        },
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    };

    const newChart = createChart(chartContainerRef.current, chartOptions);
    const newSeries = newChart.addLineSeries({
      color: crypto.price_change_percentage_24h >= 0 ? '#34D399' : '#EF4444',
      lineWidth: 2,
    });

    newSeries.setData(priceData);
    newChart.timeScale().fitContent();

    setChart(newChart);
    setSeries(newSeries);

    const handleResize = () => {
      if (chartContainerRef.current) {
        newChart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      newChart.remove();
    };
  }, [priceData, crypto.price_change_percentage_24h]);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg px-4 py-3 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-3">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{crypto.name}</h2>
              <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <GlassCard variant="settings" className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">{t.price}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xl font-mono font-semibold">
                  ${crypto.current_price.toLocaleString()}
                </p>
                <div
                  className={`flex items-center text-sm ${
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
            <div>
              <p className="text-sm text-gray-400">{t.marketCap}</p>
              <p className="text-lg font-mono">
                {formatNumber(crypto.market_cap)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t.volume}</p>
              <p className="text-lg font-mono">
                {formatNumber(crypto.total_volume)}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="settings" className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">
                {t.timeframes[timeframe]}
              </span>
            </div>
            <div className="flex space-x-2">
              {(['1D', '7D', '1M', '6M'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    timeframe === tf
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="text-white/50">{t.loading}</div>
            </div>
          ) : error ? (
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div ref={chartContainerRef} className="h-[400px]" />
          )}
        </GlassCard>
      </div>
    </div>
  );
};