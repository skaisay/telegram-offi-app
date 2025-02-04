import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Article {
  id: string;
  languageId: string;
  title: string;
  content: string;
  image: string;
}

interface ReadingStats {
  totalTimeSpent: number;
  articlesRead: number;
  lastReadTimestamp: number | null;
}

interface ArticlesState {
  savedArticles: string[];
  downloadedArticles: string[];
  readingStats: ReadingStats;
  toggleSaved: (id: string) => void;
  toggleDownloaded: (id: string) => void;
  isSaved: (id: string) => boolean;
  isDownloaded: (id: string) => boolean;
  updateReadingTime: () => void;
  incrementArticlesRead: () => void;
  getReadingStats: () => ReadingStats;
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
      toggleSaved: (id) =>
        set((state) => ({
          savedArticles: state.savedArticles.includes(id)
            ? state.savedArticles.filter((articleId) => articleId !== id)
            : [...state.savedArticles, id],
        })),
      toggleDownloaded: (id) =>
        set((state) => ({
          downloadedArticles: state.downloadedArticles.includes(id)
            ? state.downloadedArticles.filter((articleId) => articleId !== id)
            : [...state.downloadedArticles, id],
        })),
      isSaved: (id) => get().savedArticles.includes(id),
      isDownloaded: (id) => get().downloadedArticles.includes(id),
      updateReadingTime: () =>
        set((state) => {
          const now = Date.now();
          const lastTimestamp = state.readingStats.lastReadTimestamp;
          
          if (lastTimestamp) {
            const timeSpent = Math.min((now - lastTimestamp) / 1000, 300);
            return {
              readingStats: {
                ...state.readingStats,
                totalTimeSpent: state.readingStats.totalTimeSpent + timeSpent,
                lastReadTimestamp: now,
              },
            };
          }
          
          return {
            readingStats: {
              ...state.readingStats,
              lastReadTimestamp: now,
            },
          };
        }),
      incrementArticlesRead: () =>
        set((state) => ({
          readingStats: {
            ...state.readingStats,
            articlesRead: state.readingStats.articlesRead + 1,
          },
        })),
      getReadingStats: () => get().readingStats,
    }),
    {
      name: 'articles-storage',
    }
  )
);