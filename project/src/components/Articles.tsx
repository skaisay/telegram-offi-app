import React, { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ArticleActions } from './ArticleActions';
import { useArticles } from '../hooks/useArticles';

export const Articles: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { isSaved, isDownloaded, toggleSaved, toggleDownloaded, updateReadingTime } = useArticles();

  useEffect(() => {
    const interval = setInterval(updateReadingTime, 1000);
    return () => clearInterval(interval);
  }, [updateReadingTime]);

  const articles = {
    en: [
      {
        id: 'en-1',
        languageId: 'en',
        title: "Space Exploration",
        content: "Recent discoveries in deep space have revealed new possibilities for interstellar travel. Scientists at NASA have identified potential shortcuts through space-time that could revolutionize our approach to space exploration...",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-2',
        languageId: 'en',
        title: "Quantum Computing Breakthrough",
        content: "A team of researchers has achieved quantum supremacy with a new type of qubit that maintains coherence for unprecedented periods. This breakthrough could accelerate the development of practical quantum computers...",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-3',
        languageId: 'en',
        title: "Deep Ocean Discoveries",
        content: "Marine biologists have discovered a new ecosystem thriving in the Mariana Trench. The findings include previously unknown species that have adapted to extreme pressure and darkness...",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-4',
        languageId: 'en',
        title: "AI in Healthcare",
        content: "Artificial intelligence is transforming medical diagnosis with new algorithms that can detect diseases earlier and more accurately than human doctors. The technology is particularly promising in radiology...",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-5',
        languageId: 'en',
        title: "Future of Clean Energy",
        content: "Breakthrough in fusion technology brings us closer to unlimited clean energy. The latest experiments have achieved sustained fusion reactions for several minutes, marking a historic milestone...",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-6',
        languageId: 'en',
        title: "Mars Colonization Plans",
        content: "SpaceX reveals detailed plans for the first human settlement on Mars. The ambitious project includes revolutionary life support systems and sustainable agriculture solutions...",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-7',
        languageId: 'en',
        title: "Breakthrough in Neuroscience",
        content: "Scientists have mapped new neural pathways that could lead to treatments for various neurological conditions. This discovery opens up possibilities for targeted therapies...",
        image: "https://images.unsplash.com/photo-1559757175-7b31bfb2c814?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-8',
        languageId: 'en',
        title: "Climate Change Solutions",
        content: "Innovative carbon capture technology shows promising results in large-scale trials. The system could remove millions of tons of CO2 from the atmosphere annually...",
        image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-9',
        languageId: 'en',
        title: "Future of Transportation",
        content: "Revolutionary magnetic levitation system promises to transform urban transportation. The technology could enable speeds of up to 500 mph while being energy efficient...",
        image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80"
      }
    ],
    ru: [
      {
        id: 'ru-1',
        languageId: 'ru',
        title: "Исследование космоса",
        content: "Недавние открытия в глубоком космосе открыли новые возможности для межзвездных путешествий. Ученые NASA обнаружили потенциальные пути через пространство-время, которые могут революционизировать наш подход к исследованию космоса...",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-2',
        languageId: 'ru',
        title: "Прорыв в квантовых вычислениях",
        content: "Команда исследователей достигла квантового превосходства с новым типом кубита, который сохраняет когерентность в течение беспрецедентного времени. Этот прорыв может ускорить развитие практических квантовых компьютеров...",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-3',
        languageId: 'ru',
        title: "Открытия в глубинах океана",
        content: "Морские биологи обнаружили новую экосистему в Марианской впадине. Среди находок - ранее неизвестные виды, адаптировавшиеся к экстремальному давлению и темноте...",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-4',
        languageId: 'ru',
        title: "ИИ в здравоохранении",
        content: "Искусственный интеллект трансформирует медицинскую диагностику с помощью новых алгоритмов, которые могут обнаруживать заболевания раньше и точнее, чем врачи. Технология особенно перспективна в радиологии...",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-5',
        languageId: 'ru',
        title: "Будущее чистой энергии",
        content: "Прорыв в технологии термоядерного синтеза приближает нас к неограниченной чистой энергии. Последние эксперименты достигли устойчивых термоядерных реакций в течение нескольких минут, что является историческим достижением...",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-6',
        languageId: 'ru',
        title: "Планы колонизации Марса",
        content: "SpaceX раскрывает детальные планы первого человеческого поселения на Марсе. Амбициозный проект включает революционные системы жизнеобеспечения и решения для устойчивого сельского хозяйства...",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-7',
        languageId: 'ru',
        title: "Прорыв в нейронауке",
        content: "Ученые картировали новые нейронные пути, которые могут привести к лечению различных неврологических состояний. Это открытие открывает возможности для целенаправленной терапии...",
        image: "https://images.unsplash.com/photo-1559757175-7b31bfb2c814?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-8',
        languageId: 'ru',
        title: "Решения проблемы изменения климата",
        content: "Инновационная технология улавливания углерода показывает многообещающие результаты в масштабных испытаниях. Система может удалять миллионы тонн CO2 из атмосферы ежегодно...",
        image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-9',
        languageId: 'ru',
        title: "Будущее транспорта",
        content: "Революционная система магнитной левитации обещает трансформировать городской транспорт. Технология может обеспечить скорость до 800 км/ч при высокой энергоэффективности...",
        image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80"
      }
    ]
  };

  const handleShare = async (article: any) => {
    const text = encodeURIComponent(article.title);
    const url = `tg://msg_url?url=${encodeURIComponent(article.image)}&text=${text}`;
    window.location.href = url;
  };

  const currentArticles = articles[currentLanguage] || articles.en;

  return (
    <div className="px-4 py-6 space-y-8 overflow-y-auto max-h-screen scrollbar-hide">
      {currentArticles.map((article) => (
        <div key={article.id} className="space-y-3 relative">
          <div className="relative">
            <img 
              src={article.image} 
              alt=""
              className="w-full h-48 object-cover transition-transform duration-500 
                hover:scale-[1.02] rounded-2xl"
            />
            <ArticleActions
              articleId={article.id}
              isSaved={isSaved(article.id)}
              isDownloaded={isDownloaded(article.id)}
              onSave={() => toggleSaved(article.id)}
              onDownload={() => toggleDownloaded(article.id)}
              onShare={() => handleShare(article)}
            />
          </div>
          <h2 className="text-xl font-semibold text-white">{article.title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{article.content}</p>
        </div>
      ))}
    </div>
  );
};