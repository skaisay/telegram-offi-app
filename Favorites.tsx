import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useArticles } from '../../hooks/useArticles';
import { useLanguage } from '../../hooks/useLanguage';
import { ArticleActions } from '../ArticleActions';
import { GlassCard } from '../GlassCard';

interface FavoritesProps {
  onBack: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onBack }) => {
  const { savedArticles, isSaved, isDownloaded, toggleSaved, toggleDownloaded } = useArticles();
  const { currentLanguage } = useLanguage();

  const handleShare = async (article: any) => {
    const text = encodeURIComponent(`${article.title}\n\n${article.content}`);
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

      {savedArticles.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">У вас пока нет сохранённых статей</p>
      ) : (
        <div className="space-y-8">
          {savedArticles.map((article) => (
            <GlassCard key={article.id} className="overflow-hidden">
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <ArticleActions
                    articleId={article.id}
                    isSaved={isSaved(article.id)}
                    isDownloaded={isDownloaded(article.id)}
                    onSave={() => toggleSaved(article)}
                    onDownload={() => toggleDownloaded(article.id)}
                    onShare={() => handleShare(article)}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-white/90">{article.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed">{article.content}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};