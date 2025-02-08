import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VersionChange {
  version: string;
  date: string;
  changes: string[];
}

interface VersionState {
  currentVersion: string;
  changes: VersionChange[];
  addChange: (change: VersionChange) => void;
  getChangelog: () => VersionChange[];
}

export const useAppVersion = create<VersionState>()(
  persist(
    (set, get) => ({
      currentVersion: '1.1.0',
      changes: [
        {
          version: '1.1.0',
          date: '2024-03-20',
          changes: [
            'Добавлена публикация в истории Telegram',
            'Улучшен интерфейс шеринга',
            'Добавлена поддержка офлайн-режима',
            'Улучшены анимации переходов',
            'Добавлена интеграция с соцсетями'
          ]
        },
        {
          version: '1.0.0',
          date: '2024-03-15',
          changes: [
            'Первый релиз приложения',
            'Основной функционал чтения статей',
            'Поддержка избранного',
            'Мультиязычность'
          ]
        }
      ],
      addChange: (change) => {
        set((state) => ({
          changes: [change, ...state.changes]
        }));
      },
      getChangelog: () => get().changes
    }),
    {
      name: 'app-version',
      version: 1
    }
  )
);