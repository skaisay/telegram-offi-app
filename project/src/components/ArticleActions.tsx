import React from 'react';
import { Share2, Star, Download, Check } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface ArticleActionsProps {
  articleId: number;
  isSaved: boolean;
  isDownloaded: boolean;
  onSave: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export const ArticleActions: React.FC<ArticleActionsProps> = ({
  isSaved,
  isDownloaded,
  onSave,
  onDownload,
  onShare,
}) => {
  const { addToast } = useToast();

  const handleShare = async () => {
    try {
      onShare();
      addToast('Открываем Telegram...', 'success');
    } catch (error) {
      addToast('Не удалось поделиться', 'error');
    }
  };

  const handleSave = () => {
    onSave();
    addToast(isSaved ? 'Удалено из избранного' : 'Добавлено в избранное', 'success');
  };

  const handleDownload = () => {
    onDownload();
    addToast(
      isDownloaded ? 'Удалено из загрузок' : 'Сохранено для офлайн просмотра',
      'success'
    );
  };

  return (
    <div className="absolute top-2 right-2 flex items-center space-x-2">
      <button
        onClick={handleSave}
        className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm
          border border-white/10 transition-all duration-300
          hover:bg-white/10 active:bg-white/20"
      >
        <Star
          size={16}
          className={isSaved ? 'fill-white text-white' : 'text-white'}
        />
      </button>
      <button
        onClick={handleDownload}
        className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm
          border border-white/10 transition-all duration-300
          hover:bg-white/10 active:bg-white/20"
      >
        {isDownloaded ? (
          <Check size={16} className="text-white" />
        ) : (
          <Download size={16} className="text-white" />
        )}
      </button>
      <button
        onClick={handleShare}
        className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm
          border border-white/10 transition-all duration-300
          hover:bg-white/10 active:bg-white/20"
      >
        <Share2 size={16} className="text-white" />
      </button>
    </div>
  );
};