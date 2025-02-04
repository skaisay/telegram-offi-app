import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useArticles } from '../../hooks/useArticles';
import { useLanguage } from '../../hooks/useLanguage';
import { ArticleActions } from '../ArticleActions';

interface FavoritesProps {
  onBack: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onBack }) => {
  const { savedArticles, isSaved, isDownloaded, toggleSaved, toggleDownloaded } = useArticles();
  const { currentLanguage } = useLanguage();

  const articles = {
    en: [
      {
        id: 'en-1',
        languageId: 'en',
        title: "Space Exploration",
        content: "Recent discoveries in deep space have revealed new possibilities...",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80"
      },
      // ... остальные статьи
    ],
    ru: [
      {
        id: 'ru-1',
        languageId: 'ru',
        title: "Исследование космоса",
        content: "Недавние открытия в глубоком космосе открыли новые возможности...",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80"
      },
      // ... остальные статьи
    ]
  };

  const currentArticles = articles[currentLanguage] || articles.en;
  const savedArticlesList = currentArticles.filter(article => savedArticles.includes(article.id));

  const handleShare = async (article: any) => {
    const text = encodeURIComponent(article.title);
    const url = `tg://msg_url?url=${encodeURIComponent(article.image)}&text=${text}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen p-4">
      <button
        onClick={onBack}
        className="mb-6 p-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <ArrowLeft className="text-white" size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6">Избранное</h2>

      {savedArticlesList.length === 0 ? (
        <GlassCard className="p-6 text-center">
          <p className="text-gray-400">У вас пока нет сохранённых статей</p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {savedArticlesList.map((article) => (
            <GlassCard key={article.id} className="p-4">
              <div className="relative">
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-32 object-cover rounded-lg"
                />
                <ArticleActions
                  articleId={article.id}
                  isSaved={isSaved(article.id)}
                  isDownloaded={isDownloaded(article.id)}
                  onSave={() => toggleSaved(article.id)}
                  onDownload={() => toggleDownloaded(article.id)}
                  onShare={() => handleShare(article)}
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{article.content}</p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};