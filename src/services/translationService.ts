import { useToast } from '../hooks/useToast';

interface TranslationResponse {
  translated_text: string;
  status: 'success' | 'error';
  message?: string;
}

class TranslationService {
  private static instance: TranslationService;
  private apiKey: string | null = null;
  private baseUrl = 'https://api.gixui.com/v1/translate';

  private constructor() {}

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async translateText(text: string, targetLang: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key not set');
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          text,
          target_lang: targetLang,
        })
      });

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data: TranslationResponse = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'Translation failed');
      }

      return data.translated_text;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    return Promise.all(texts.map(text => this.translateText(text, targetLang)));
  }
}

export const translationService = TranslationService.getInstance();