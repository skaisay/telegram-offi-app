import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

interface ChatBotState {
  messages: Message[];
  firstOpenTimestamp: number | null;
  hasSeenNew: boolean;
  addMessage: (text: string, isBot: boolean) => void;
  markNewAsSeen: () => void;
  shouldShowNew: () => boolean;
}

export const useChatBot = create<ChatBotState>()(
  persist(
    (set, get) => ({
      messages: [],
      firstOpenTimestamp: null,
      hasSeenNew: false,
      addMessage: (text, isBot) => {
        const message: Message = {
          id: Date.now().toString(),
          text,
          isBot,
          timestamp: Date.now(),
        };
        set((state) => ({
          messages: [...state.messages, message],
          firstOpenTimestamp: state.firstOpenTimestamp || Date.now(),
        }));
      },
      markNewAsSeen: () => {
        set({ hasSeenNew: true });
      },
      shouldShowNew: () => {
        const state = get();
        if (state.hasSeenNew) return false;
        return !state.firstOpenTimestamp || 
          (Date.now() - state.firstOpenTimestamp) < 7 * 24 * 60 * 60 * 1000;
      },
    }),
    {
      name: 'chatbot-storage',
      version: 1,
    }
  )
);