import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { useLanguage } from '../../hooks/useLanguage';
import { useChatBot } from '../../hooks/useChatBot';

interface ChatBotProps {
  onBack: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onBack }) => {
  const { currentLanguage } = useLanguage();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage } = useChatBot();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const translations = {
    en: {
      title: 'ChatBot',
      placeholder: 'Ask a question...',
      send: 'Send',
      greeting: "Hello! I'm your assistant. I can help you with:\n- Cryptocurrency information\n- App features and usage\n- General questions",
    },
    ru: {
      title: 'Чат-бот',
      placeholder: 'Задайте вопрос...',
      send: 'Отправить',
      greeting: "Привет! Я ваш помощник. Я могу помочь вам с:\n- Информацией о криптовалютах\n- Функциями и использованием приложения\n- Общими вопросами",
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (messages.length === 0) {
      addMessage(t.greeting, true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hide navigation when ChatBot is open
  useEffect(() => {
    const navigation = document.querySelector('nav');
    if (navigation) {
      navigation.style.display = 'none';
    }
    return () => {
      if (navigation) {
        navigation.style.display = '';
      }
    };
  }, []);

  // Handle keyboard visibility
  useEffect(() => {
    const handleFocus = () => {
      setIsKeyboardOpen(true);
      document.body.classList.add('keyboard-open');
    };

    const handleBlur = () => {
      setIsKeyboardOpen(false);
      document.body.classList.remove('keyboard-open');
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, false);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateResponse(userMessage, currentLanguage);
      addMessage(botResponse, true);
    }, Math.random() * 1000 + 500);
  };

  const generateResponse = (message: string, language: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (language === 'ru') {
      if (lowerMessage.includes('биткоин') || lowerMessage.includes('bitcoin')) {
        return 'Bitcoin (BTC) - это первая и самая известная криптовалюта, созданная в 2009 году. Она работает на технологии блокчейн и позволяет проводить безопасные транзакции без посредников.';
      }
      if (lowerMessage.includes('как сохранить')) {
        return 'Чтобы сохранить статью, нажмите на звездочку в правом верхнем углу статьи. Сохранённые статьи доступны в разделе "Избранное".';
      }
      return 'Извините, я не совсем понял ваш вопрос. Попробуйте спросить о криптовалютах или функциях приложения.';
    }

    if (lowerMessage.includes('bitcoin')) {
      return 'Bitcoin (BTC) is the first and most well-known cryptocurrency, created in 2009. It operates on blockchain technology and enables secure, peer-to-peer transactions without intermediaries.';
    }
    if (lowerMessage.includes('how to save')) {
      return 'To save an article, click the star icon in the top right corner of the article. Saved articles can be found in the Favorites section.';
    }
    return 'I\'m not sure I understand your question. Try asking about cryptocurrencies or app features.';
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg px-4 py-3 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <Bot size={24} className="text-white" />
            <h2 className="text-2xl font-bold">{t.title}</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <GlassCard
                variant={message.isBot ? 'settings' : 'menu'}
                className={`p-4 max-w-[80%] ${message.isBot ? '' : 'bg-white/20'}`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </GlassCard>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className={`sticky bottom-0 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4 ${
        isKeyboardOpen ? 'pb-0' : ''
      }`}>
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2
              text-white placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-white/20 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 
              transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};