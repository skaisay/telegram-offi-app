import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OfflineArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  timestamp: number;
}

interface OfflineState {
  articles: OfflineArticle[];
  addArticle: (article: OfflineArticle) => void;
  removeArticle: (id: string) => void;
  getArticle: (id: string) => OfflineArticle | undefined;
  hasArticle: (id: string) => boolean;
}

export const useOfflineStorage = create<OfflineState>()(
  persist(
    (set, get) => ({
      articles: [],
      addArticle: (article) => {
        set((state) => ({
          articles: [...state.articles, article]
        }));
      },
      removeArticle: (id) => {
        set((state) => ({
          articles: state.articles.filter(article => article.id !== id)
        }));
      },
      getArticle: (id) => {
        return get().articles.find(article => article.id === id);
      },
      hasArticle: (id) => {
        return get().articles.some(article => article.id === id);
      }
    }),
    {
      name: 'offline-storage',
      version: 1
    }
  )
);