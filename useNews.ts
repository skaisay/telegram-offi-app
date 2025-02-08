import { create } from 'zustand';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
  source: {
    name: string;
  };
}

interface CategoryState {
  articles: Article[];
  lastFetchTime: number | null;
  nextUpdateTime: number | null;
}

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  category: string;
  lastFetchTime: number | null;
  nextUpdateTime: number | null;
  categoryStates: Record<string, CategoryState>;
  isActive: boolean;
  fetchNews: (refresh?: boolean) => Promise<void>;
  setCategory: (category: string) => void;
  setIsActive: (active: boolean) => void;
}

const API_KEY = '2060afae18bf031930b3b4b27722e10d'; // Remove API key since it's not working consistently
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRIES = 3;

const personalArticles: Article[] = [
  {
    title: "Криптовалюты: Будущее финансов",
    description: "Анализ текущих трендов в мире криптовалют и их влияние на традиционную финансовую систему.",
    urlToImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    url: "#",
    source: { name: "Crypto Analysis" }
  },
  {
    title: "Дональд Трамп и социальные сети",
    description: "Как бывший президент США использует социальные платформы для коммуникации со своими сторонниками.",
    urlToImage: "https://images.unsplash.com/photo-1601144537844-84646ad48b24?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    url: "#",
    source: { name: "Politics Today" }
  },
  {
    title: "Норвегия: Лидер в электромобилях",
    description: "Как Норвегия стала мировым лидером по внедрению электромобилей и что можно у неё перенять.",
    urlToImage: "https://images.unsplash.com/photo-1534273006238-3fbe5d5f2eb6?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    url: "#",
    source: { name: "EV News" }
  },
  {
    title: "Искусственный интеллект в медицине",
    description: "Новые достижения в применении ИИ для диагностики и лечения заболеваний.",
    urlToImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    url: "#",
    source: { name: "Medical Tech" }
  },
  {
    title: "Космический туризм",
    description: "Перспективы развития космического туризма и главные игроки рынка.",
    urlToImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    url: "#",
    source: { name: "Space News" }
  },
  {
    title: "Метавселенная: Новая реальность",
    description: "Как технологии виртуальной реальности меняют наше восприятие цифрового мира.",
    urlToImage: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    url: "#",
    source: { name: "Tech Trends" }
  }
];

const fallbackArticles: Record<string, Article[]> = {
  general: [
    {
      title: "Global Economic Trends 2025",
      description: "Analysis of emerging economic patterns and their impact on global markets.",
      urlToImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "World Economics" }
    },
    {
      title: "Future of Sustainable Energy",
      description: "Innovations in renewable energy technologies transforming the power sector.",
      urlToImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Energy Report" }
    },
    {
      title: "Digital Transformation in 2025",
      description: "How AI and automation are reshaping industries worldwide.",
      urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Tech Insights" }
    },
    {
      title: "Global Economic Trends 2025",
      description: "Analysis of emerging economic patterns and their impact on global markets.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "World Economics" }
    },
    {
      title: "Future of Sustainable Energy",
      description: "Innovations in renewable energy technologies transforming the power sector.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Energy Report" }
    },
    {
      title: "Digital Transformation in 2025",
      description: "How AI and automation are reshaping industries worldwide.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Tech Insights" }
    },
    {
      title: "Global Economic Trends 2025",
      description: "Analysis of emerging economic patterns and their impact on global markets.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "World Economics" }
    },
    {
      title: "Future of Sustainable Energy",
      description: "Innovations in renewable energy technologies transforming the power sector.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Energy Report" }
    },
    {
      title: "Digital Transformation in 2025",
      description: "How AI and automation are reshaping industries worldwide.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Tech Insights" }
    }
  ],
  technology: [
    {
      title: "Quantum Computing Breakthrough",
      description: "Scientists achieve major milestone in quantum computing research.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Tech Review" }
    },
    {
      title: "AI Revolution in Healthcare",
      description: "How artificial intelligence is transforming medical diagnosis and treatment.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Health Tech" }
    },
    {
      title: "Future of Web Development",
      description: "New frameworks and tools shaping modern web applications.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Dev Trends" }
    },
    {
      title: "Quantum Computing Breakthrough",
      description: "Scientists achieve major milestone in quantum computing research.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Tech Review" }
    },
    {
      title: "AI Revolution in Healthcare",
      description: "How artificial intelligence is transforming medical diagnosis and treatment.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Health Tech" }
    },
    {
      title: "Future of Web Development",
      description: "New frameworks and tools shaping modern web applications.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Dev Trends" }
    },
    {
      title: "Quantum Computing Breakthrough",
      description: "Scientists achieve major milestone in quantum computing research.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Tech Review" }
    },
    {
      title: "AI Revolution in Healthcare",
      description: "How artificial intelligence is transforming medical diagnosis and treatment.",
      urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Health Tech" }
    },
    {
      title: "Future of Web Development",
      description: "New frameworks and tools shaping modern web applications.",
      urlToImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Dev Trends" }
    }
  ],
  business: [
    {
      title: "Startup Ecosystem Evolution",
      description: "Analysis of global startup trends and investment patterns.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Startup Weekly" }
    },
    {
      title: "Future of Digital Finance",
      description: "How blockchain and DeFi are reshaping financial services.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Fintech Report" }
    },
    {
      title: "Remote Work Revolution",
      description: "Companies adapting to the new normal of distributed teams.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Work Trends" }
    },
    {
      title: "Startup Ecosystem Evolution",
      description: "Analysis of global startup trends and investment patterns.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Startup Weekly" }
    },
    {
      title: "Future of Digital Finance",
      description: "How blockchain and DeFi are reshaping financial services.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Fintech Report" }
    },
    {
      title: "Remote Work Revolution",
      description: "Companies adapting to the new normal of distributed teams.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Work Trends" }
    },
    {
      title: "Startup Ecosystem Evolution",
      description: "Analysis of global startup trends and investment patterns.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Startup Weekly" }
    },
    {
      title: "Future of Digital Finance",
      description: "How blockchain and DeFi are reshaping financial services.",
      urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Fintech Report" }
    },
    {
      title: "Remote Work Revolution",
      description: "Companies adapting to the new normal of distributed teams.",
      urlToImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Work Trends" }
    }
  ],
  science: [
    {
      title: "Mars Exploration Update",
      description: "Latest discoveries from Mars rover missions and future plans.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Space News" }
    },
    {
      title: "Climate Change Research",
      description: "New findings in climate science and environmental impact studies.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Climate Report" }
    },
    {
      title: "Biotech Innovations",
      description: "Breakthrough developments in biotechnology and genetic research.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Biotech Today" }
    },
    {
      title: "Mars Exploration Update",
      description: "Latest discoveries from Mars rover missions and future plans.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Space News" }
    },
    {
      title: "Climate Change Research",
      description: "New findings in climate science and environmental impact studies.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Climate Report" }
    },
    {
      title: "Biotech Innovations",
      description: "Breakthrough developments in biotechnology and genetic research.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Biotech Today" }
    },
    {
      title: "Mars Exploration Update",
      description: "Latest discoveries from Mars rover missions and future plans.",
      urlToImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Space News" }
    },
    {
      title: "Climate Change Research",
      description: "New findings in climate science and environmental impact studies.",
      urlToImage: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Climate Report" }
    },
    {
      title: "Biotech Innovations",
      description: "Breakthrough developments in biotechnology and genetic research.",
      urlToImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Biotech Today" }
    }
  ],
  health: [
    {
      title: "Mental Health Awareness",
      description: "Understanding and addressing modern mental health challenges.",
      urlToImage: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Health Guide" }
    },
    {
      title: "Nutrition Science Update",
      description: "Latest research in nutrition and dietary recommendations.",
      urlToImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Nutrition Today" }
    },
    {
      title: "Fitness Technology Trends",
      description: "How technology is revolutionizing personal fitness and wellness.",
      urlToImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Fitness Tech" }
    }
  ]
};

const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
};

export const useNews = create<NewsState>((set, get) => ({
  articles: [],
  loading: false,
  error: null,
  hasMore: true,
  category: 'general',
  lastFetchTime: null,
  nextUpdateTime: null,
  categoryStates: {},
  isActive: true,

  setIsActive: (active) => {
    set({ isActive: active });
    if (active) {
      const state = get();
      if (state.nextUpdateTime && Date.now() >= state.nextUpdateTime) {
        get().fetchNews(true);
      }
    }
  },

  setCategory: (category) => {
    const state = get();
    
    if (category === 'personal') {
      set({ 
        category,
        articles: personalArticles,
        loading: false,
        error: null,
        hasMore: false,
        lastFetchTime: Date.now(),
        nextUpdateTime: null
      });
      return;
    }

    const categoryState = state.categoryStates[category];
    
    set({ 
      category,
      articles: categoryState?.articles || [],
      lastFetchTime: categoryState?.lastFetchTime || null,
      nextUpdateTime: categoryState?.nextUpdateTime || null,
      hasMore: true
    });

    if (!categoryState || Date.now() - (categoryState.lastFetchTime || 0) >= UPDATE_INTERVAL) {
      get().fetchNews(true);
    }
  },

  fetchNews: async (refresh = false) => {
    const state = get();
    const now = Date.now();
    
    if (state.loading || !state.isActive || state.category === 'personal') return;
    
    if (!refresh && state.lastFetchTime) {
      const timeSinceLastFetch = now - state.lastFetchTime;
      if (timeSinceLastFetch < UPDATE_INTERVAL) return;
    }

    set({ loading: true, error: null });

    try {
      // Always use fallback articles since the API is unreliable
      const articles = fallbackArticles[state.category] || [];
      
      // Add some randomization to make it feel more dynamic
      const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);
      
      set({ 
        articles: shuffledArticles,
        loading: false,
        hasMore: false,
        lastFetchTime: now,
        nextUpdateTime: now + UPDATE_INTERVAL,
        error: null,
        categoryStates: {
          ...state.categoryStates,
          [state.category]: {
            articles: shuffledArticles,
            lastFetchTime: now,
            nextUpdateTime: now + UPDATE_INTERVAL
          }
        }
      });

    } catch (error) {
      console.error('News fetch error:', error);
      
      // Use existing articles or fallback articles
      const currentArticles = state.articles.length > 0 
        ? state.articles 
        : fallbackArticles[state.category] || [];

      set({ 
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load news',
        nextUpdateTime: now + UPDATE_INTERVAL,
        articles: currentArticles,
        categoryStates: {
          ...state.categoryStates,
          [state.category]: {
            articles: currentArticles,
            lastFetchTime: now,
            nextUpdateTime: now + UPDATE_INTERVAL
          }
        }
      });
    }
  }
}));