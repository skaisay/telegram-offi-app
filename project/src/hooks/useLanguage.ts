import { create } from 'zustand';

interface LanguageStore {
  currentLanguage: 'en' | 'ru' | 'no' | 'zh';
  setLanguage: (language: 'en' | 'ru' | 'no' | 'zh') => void;
}

export const useLanguage = create<LanguageStore>((set) => ({
  currentLanguage: 'en',
  setLanguage: (language) => set({ currentLanguage: language }),
}));