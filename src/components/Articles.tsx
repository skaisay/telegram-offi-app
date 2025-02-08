import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ArticleActions } from './ArticleActions';
import { useArticles } from '../hooks/useArticles';
import { useNews } from '../hooks/useNews';
import { GlassCard } from './GlassCard';
import { Loader2, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface ArticlesProps {
  initialCategory?: string;
}

const categories = [
  { 
    id: 'personal', 
    label: { 
      en: 'Personal', 
      ru: 'Личное' 
    },
    icon: Sparkles,
    animate: true
  },
  { id: 'general', label: { en: 'News', ru: 'Новости' } },
  { id: 'technology', label: { en: 'Tech', ru: 'Технологии' } },
  { id: 'business', label: { en: 'Business', ru: 'Бизнес' } },
  { id: 'science', label: { en: 'Science', ru: 'Наука' } },
  { id: 'health', label: { en: 'Health', ru: 'Здоровье' } }
];

const Articles: React.FC<ArticlesProps> = ({ initialCategory = 'personal' }) => {
  const { currentLanguage } = useLanguage();
  const { isSaved, isDownloaded, toggleSaved, toggleDownloaded } = useArticles();
  const { articles, loading, error, hasMore, fetchNews, category, setCategory, nextUpdateTime, setIsActive } = useNews();
  const [showCategories, setShowCategories] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('up');
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const isTelegramWebView = window.Telegram?.WebApp;

  // Set initial category
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory, setCategory]);

  // Enhanced scroll handling with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScrollY = container.scrollTop;
      const delta = currentScrollY - lastScrollY.current;
      
      // Determine scroll direction
      const newDirection = delta > 0 ? 'down' : 'up';
      
      // Only update if direction changed or at top/bottom
      if (newDirection !== scrollDirection.current || currentScrollY <= 0) {
        scrollDirection.current = newDirection;
        
        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Add small delay for smoother transitions
        scrollTimeout.current = setTimeout(() => {
          setShowCategories(newDirection === 'up' || currentScrollY <= 0);
        }, 50);
      }

      lastScrollY.current = currentScrollY;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [setIsActive]);

  // Handle timer and auto-updates
  useEffect(() => {
    if (category === 'personal' || !nextUpdateTime) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((nextUpdateTime - now) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0) {
        fetchNews(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [category, nextUpdateTime, fetchNews]);

  const handleOpenArticle = useCallback((url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const t = {
    en: {
      tryAgain: 'Try Again',
      readMore: 'Read More',
      loading: 'Loading articles...'
    },
    ru: {
      tryAgain: 'Попробовать снова',
      readMore: 'Читать далее',
      loading: 'Загрузка статей...'
    }
  }[currentLanguage];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen h-full overflow-y-auto scroll-container"
    >
      <div className="relative pb-24">
        {/* Categories with smooth transition */}
        <div 
          className={`fixed left-0 right-0 z-10 transition-all duration-300 ease-out
            ${showCategories 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-full pointer-events-none'}`}
          style={{ 
            top: 'var(--total-top-offset)',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="px-4 py-2">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide touch-pan-x">
              {categories.map(({ id, label, icon: Icon, animate }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full whitespace-nowrap transition-colors
                    ${category === id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <div className="flex items-center">
                    {label[currentLanguage as keyof typeof label]}
                    {Icon && animate && id === 'personal' && (
                      <span className="inline-flex ml-1 items-center">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Timer integrated into categories bar */}
            {category !== 'personal' && timeRemaining !== null && timeRemaining > 0 && (
              <div className="flex items-center justify-center mt-1 pb-1">
                <div className="flex items-center space-x-1 text-sm text-white/60">
                  <Clock size={12} />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content with adjusted padding for Telegram WebView */}
        <div className={`transition-all duration-300 px-4 ${
          isTelegramWebView 
            ? 'pt-[calc(var(--total-top-offset)-10rem)]' 
            : showCategories ? 'pt-[calc(var(--total-top-offset)+1rem)]' : 'pt-[calc(var(--total-top-offset)+0.5rem)]'
        }`}>
          {error ? (
            <GlassCard className="p-4 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => fetchNews(true)}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                {t.tryAgain}
              </button>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <GlassCard
                  key={`${article.url}-${index}`}
                  className="overflow-hidden animate-fade-in"
                >
                  <div className="space-y-3">
                    <div className="relative">
                      <img 
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <ArticleActions
                        articleId={article.url}
                        isSaved={isSaved(article.url)}
                        isDownloaded={isDownloaded(article.url)}
                        onSave={() => toggleSaved(article)}
                        onDownload={() => toggleDownloaded(article.url)}
                        onShare={() => {}}
                        onShareStory={() => {}}
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">
                          {article.source.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 text-white/95">
                        {article.title}
                      </h2>
                      <p className="text-white/90 text-base leading-relaxed line-clamp-3 mb-3">
                        {article.description}
                      </p>
                      {category !== 'personal' && (
                        <button
                          onClick={() => handleOpenArticle(article.url)}
                          className="flex items-center space-x-2 text-sm text-white/60 hover:text-white
                            transition-colors px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10"
                        >
                          <span>{t.readMore}</span>
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}

              {loading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;