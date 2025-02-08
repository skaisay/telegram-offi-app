import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translationService } from '../services/translationService';

type SupportedLanguage = 'en' | 'ru' | 'zh' | 'no';

interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

interface LanguageStore {
  currentLanguage: SupportedLanguage;
  isTranslating: boolean;
  translationCache: TranslationCache;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  translateText: (text: string, targetLang?: SupportedLanguage) => Promise<string>;
  translations: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      isTranslating: false,
      translationCache: {},
      translations: {
        en: {
          settings: 'Settings',
          profile: 'Profile',
          about: 'About',
          articles: 'Articles',
          favorites: 'Favorites',
          statistics: 'Statistics',
          notifications: 'Notifications',
          menu: 'Menu',
          starAnimation: 'Star Animation',
          language: 'Language',
          save: 'Save',
          share: 'Share',
          download: 'Download',
          crypto: 'Cryptocurrencies',
          cryptoDesc: 'Cryptocurrency rates',
          chatbot: 'ChatBot',
          chatbotDesc: 'Ask questions about crypto and app',
          new: 'NEW',
          favorites_desc: 'Saved articles',
          notifications_desc: 'Notification settings',
          statistics_desc: 'Your activity'
        },
        ru: {
          settings: 'Настройки',
          profile: 'Профиль',
          about: 'О приложении',
          articles: 'Статьи',
          favorites: 'Избранное',
          statistics: 'Статистика',
          notifications: 'Уведомления',
          menu: 'Меню',
          starAnimation: 'Звездная анимация',
          language: 'Язык',
          save: 'Сохранить',
          share: 'Поделиться',
          download: 'Скачать',
          crypto: 'Криптовалюты',
          cryptoDesc: 'Курсы криптовалют',
          chatbot: 'Чат-бот',
          chatbotDesc: 'Задавайте вопросы о крипто и приложении',
          new: 'НОВОЕ',
          favorites_desc: 'Сохранённые статьи',
          notifications_desc: 'Настройка уведомлений',
          statistics_desc: 'Ваша активность'
        },
        zh: {
          // Will be populated by translation API
        },
        no: {
          // Will be populated by translation API
        }
      },
      setLanguage: async (language: SupportedLanguage) => {
        const currentState = get();
        
        // If switching to a language that needs translation
        if (['zh', 'no'].includes(language) && !currentState.translations[language]?.settings) {
          set({ isTranslating: true });
          
          try {
            // Get English translations as source
            const sourceTexts = Object.values(currentState.translations.en);
            
            // Translate all texts
            const translatedTexts = await translationService.translateBatch(sourceTexts, language);
            
            // Create new translations object
            const newTranslations = {};
            Object.keys(currentState.translations.en).forEach((key, index) => {
              newTranslations[key] = translatedTexts[index];
            });
            
            // Update translations
            set(state => ({
              translations: {
                ...state.translations,
                [language]: newTranslations
              }
            }));
          } catch (error) {
            console.error('Translation error:', error);
            // Fallback to English if translation fails
            language = 'en';
          } finally {
            set({ isTranslating: false });
          }
        }
        
        set({ currentLanguage: language });
      },
      translateText: async (text: string, targetLang?: SupportedLanguage) => {
        const state = get();
        const lang = targetLang || state.currentLanguage;
        
        // Check cache first
        if (state.translationCache[text]?.[lang]) {
          return state.translationCache[text][lang];
        }
        
        try {
          const translatedText = await translationService.translateText(text, lang);
          
          // Update cache
          set(state => ({
            translationCache: {
              ...state.translationCache,
              [text]: {
                ...state.translationCache[text],
                [lang]: translatedText
              }
            }
          }));
          
          return translatedText;
        } catch (error) {
          console.error('Translation error:', error);
          return text; // Fallback to original text
        }
      }
    }),
    {
      name: 'language-storage',
      version: 2,
    }
  )
);