import React from 'react';
import { Share2, Star, Download, Check, History, Facebook, Twitter, Instagram, Send } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface ArticleActionsProps {
  articleId: string;
  isSaved: boolean;
  isDownloaded: boolean;
  onSave: () => void;
  onDownload: () => void;
  onShare: () => void;
  onShareStory: () => void;
}

export const ArticleActions: React.FC<ArticleActionsProps> = ({
  isSaved,
  isDownloaded,
  onSave,
  onDownload,
  onShare,
  onShareStory,
}) => {
  const { addToast } = useToast();
  const [showShareMenu, setShowShareMenu] = React.useState(false);

  const handleShare = async (platform: string) => {
    try {
      switch (platform) {
        case 'telegram':
          onShare();
          break;
        case 'story':
          onShareStory();
          break;
        case 'facebook':
          window.open('https://www.facebook.com/sharer/sharer.php', '_blank');
          break;
        case 'twitter':
          window.open('https://twitter.com/intent/tweet', '_blank');
          break;
        case 'instagram':
          // Instagram sharing is handled through Stories API
          addToast('Поделиться в Instagram', 'success');
          break;
        default:
          onShare();
      }
      setShowShareMenu(false);
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
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm
            border border-white/10 transition-all duration-300
            hover:bg-white/10 active:bg-white/20"
        >
          <Share2 size={16} className="text-white" />
        </button>
        
        {showShareMenu && (
          <div className="absolute right-0 top-full mt-2 bg-black/80 backdrop-blur-lg rounded-lg
            border border-white/10 overflow-hidden min-w-[120px] z-50">
            <div className="py-1">
              <button
                onClick={() => handleShare('telegram')}
                className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-white/10"
              >
                <Send size={14} />
                <span className="text-sm">Telegram</span>
              </button>
              <button
                onClick={() => handleShare('story')}
                className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-white/10"
              >
                <History size={14} />
                <span className="text-sm">История</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-white/10"
              >
                <Facebook size={14} />
                <span className="text-sm">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-white/10"
              >
                <Twitter size={14} />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('instagram')}
                className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-white/10"
              >
                <Instagram size={14} />
                <span className="text-sm">Instagram</span>
              </button>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
};