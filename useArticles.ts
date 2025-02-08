import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  languageId: string;
}

interface ArticlesState {
  savedArticles: Article[];
  downloadedArticles: string[];
  readingStats: {
    totalTimeSpent: number;
    articlesRead: number;
    lastReadTimestamp: number | null;
  };
  toggleSaved: (article: Article) => void;
  toggleDownloaded: (id: string) => void;
  isSaved: (id: string) => boolean;
  isDownloaded: (id: string) => boolean;
  updateReadingTime: () => void;
  getReadingStats: () => {
    totalTimeSpent: number;
    articlesRead: number;
    lastReadTimestamp: number | null;
  };
  getSavedArticles: () => Article[];
}

export const useArticles = create<ArticlesState>()(
  persist(
    (set, get) => ({
      savedArticles: [],
      downloadedArticles: [],
      readingStats: {
        totalTimeSpent: 0,
        articlesRead: 0,
        lastReadTimestamp: null,
      },
      toggleSaved: (article) => {
        set((state) => {
          const isSaved = state.savedArticles.some(saved => saved.id === article.id);
          let newSavedArticles;
          
          if (isSaved) {
            newSavedArticles = state.savedArticles.filter(saved => saved.id !== article.id);
          } else {
            newSavedArticles = [...state.savedArticles, article];
          }

          return {
            savedArticles: newSavedArticles,
            readingStats: {
              ...state.readingStats,
              articlesRead: state.readingStats.articlesRead + (isSaved ? -1 : 1),
            },
          };
        });
      },
      toggleDownloaded: (id) => {
        set((state) => {
          const isDownloaded = state.downloadedArticles.includes(id);
          return {
            downloadedArticles: isDownloaded
              ? state.downloadedArticles.filter(articleId => articleId !== id)
              : [...state.downloadedArticles, id],
          };
        });
      },
      isSaved: (id) => {
        return get().savedArticles.some(article => article.id === id);
      },
      isDownloaded: (id) => {
        return get().downloadedArticles.includes(id);
      },
      updateReadingTime: () => {
        set((state) => {
          const now = Date.now();
          const lastTimestamp = state.readingStats.lastReadTimestamp;
          
          if (!lastTimestamp) {
            return {
              readingStats: {
                ...state.readingStats,
                lastReadTimestamp: now,
              },
            };
          }
          
          const timeSpent = Math.min((now - lastTimestamp) / 1000, 300);
          return {
            readingStats: {
              ...state.readingStats,
              totalTimeSpent: state.readingStats.totalTimeSpent + timeSpent,
              lastReadTimestamp: now,
            },
          };
        });
      },
      getReadingStats: () => get().readingStats,
      getSavedArticles: () => get().savedArticles,
    }),
    {
      name: 'articles-storage',
      version: 3,
      migrate: (persistedState: any, version: number) => {
        if (version === 1) {
          return {
            ...persistedState,
            savedArticles: [],
            downloadedArticles: [],
            readingStats: {
              totalTimeSpent: 0,
              articlesRead: 0,
              lastReadTimestamp: null,
            },
          };
        }
        if (version === 2) {
          return {
            ...persistedState,
            savedArticles: Array.isArray(persistedState.savedArticles) 
              ? persistedState.savedArticles 
              : [],
            downloadedArticles: Array.isArray(persistedState.downloadedArticles)
              ? persistedState.downloadedArticles
              : [],
            readingStats: {
              totalTimeSpent: persistedState.readingStats?.totalTimeSpent || 0,
              articlesRead: persistedState.readingStats?.articlesRead || 0,
              lastReadTimestamp: null,
            },
          };
        }
        return persistedState;
      },
    }
  )
);