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
        id: 'en-12',
        languageId: 'en',
        title: "AI Breakthrough in Nuclear Fusion",
        content: "DeepMind's AI system has made a significant breakthrough in controlling plasma in nuclear fusion reactors, potentially solving one of the biggest challenges in achieving sustainable fusion energy...",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-11',
        languageId: 'en',
        title: "Quantum Computing Milestone",
        content: "Scientists have achieved quantum supremacy with a 1000-qubit processor, marking a historic moment in computing history. This breakthrough promises to revolutionize cryptography and drug discovery...",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-10',
        languageId: 'en',
        title: "Mars Colony Progress",
        content: "SpaceX announces successful test of new life support systems for Mars habitats. The breakthrough in recycling technology brings us one step closer to permanent human presence on the Red Planet...",
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-9',
        languageId: 'en',
        title: "Ocean Cleanup Innovation",
        content: "Revolutionary autonomous vessels using AI have removed over 100,000 tons of plastic from the Pacific garbage patch. This new technology could clean our oceans within a decade...",
        image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-8',
        languageId: 'en',
        title: "Renewable Energy Record",
        content: "Global renewable energy capacity surpasses fossil fuels for the first time in history. Solar and wind power lead the transformation of the global energy landscape...",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-7',
        languageId: 'en',
        title: "Brain-Computer Interface Success",
        content: "Paralyzed patients achieve breakthrough in communication using new neural implant technology. The system allows direct thought-to-text conversion with 95% accuracy...",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-6',
        languageId: 'en',
        title: "Space Tourism Milestone",
        content: "First commercial space hotel announces opening date for 2025. The orbital facility will accommodate up to 400 guests with artificial gravity and luxury amenities...",
        image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-5',
        languageId: 'en',
        title: "Climate Change Victory",
        content: "New carbon capture technology removes record amounts of CO2 from atmosphere. Global implementation could reverse climate change effects within decades...",
        image: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-4',
        languageId: 'en',
        title: "Medical Breakthrough",
        content: "Scientists develop universal cancer vaccine using mRNA technology. Clinical trials show 94% effectiveness across multiple types of cancer...",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'en-3',
        languageId: 'en',
        title: "Flying Car Certification",
        content: "First flying car receives FAA certification for commercial use. Mass production scheduled to begin next year with deliveries starting in major cities...",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=800&q=80"
      }
    ],
    ru: [
      {
        id: 'ru-12',
        languageId: 'ru',
        title: "Прорыв ИИ в термоядерном синтезе",
        content: "Система искусственного интеллекта DeepMind совершила значительный прорыв в управлении плазмой в реакторах термоядерного синтеза, потенциально решая одну из главных проблем в достижении устойчивой термоядерной энергии...",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-11',
        languageId: 'ru',
        title: "Достижение в квантовых вычислениях",
        content: "Учёные достигли квантового превосходства с процессором на 1000 кубитов, что стало историческим моментом в истории вычислений. Этот прорыв обещает революцию в криптографии и разработке лекарств...",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-10',
        languageId: 'ru',
        title: "Прогресс в колонизации Марса",
        content: "SpaceX объявляет об успешном испытании новых систем жизнеобеспечения для марсианских habitat'ов. Прорыв в технологии переработки приближает нас на шаг к постоянному присутствию человека на Красной планете...",
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-9',
        languageId: 'ru',
        title: "Инновации в очистке океана",
        content: "Революционные автономные суда с использованием ИИ удалили более 100 000 тонн пластика из тихоокеанского мусорного пятна. Эта новая технология может очистить наши океаны в течение десятилетия...",
        image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-8',
        languageId: 'ru',
        title: "Рекорд возобновляемой энергии",
        content: "Глобальная мощность возобновляемых источников энергии впервые в истории превысила ископаемое топливо. Солнечная и ветровая энергия лидируют в трансформации глобального энергетического ландшафта...",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-7',
        languageId: 'ru',
        title: "Успех нейроинтерфейса",
        content: "Парализованные пациенты достигли прорыва в общении с помощью новой технологии нейронных имплантатов. Система позволяет напрямую преобразовывать мысли в текст с точностью 95%...",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-6',
        languageId: 'ru',
        title: "Веха в космическом туризме",
        content: "Первый коммерческий космический отель объявляет дату открытия в 2025 году. Орбитальный комплекс сможет разместить до 400 гостей с искусственной гравитацией и роскошными удобствами...",
        image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-5',
        languageId: 'ru',
        title: "Победа над изменением климата",
        content: "Новая технология улавливания углерода удаляет рекордное количество CO2 из атмосферы. Глобальное внедрение может обратить вспять последствия изменения климата в течение десятилетий...",
        image: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-4',
        languageId: 'ru',
        title: "Медицинский прорыв",
        content: "Учёные разработали универсальную вакцину против рака с использованием технологии мРНК. Клинические испытания показывают 94% эффективности при различных типах рака...",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ru-3',
        languageId: 'ru',
        title: "Сертификация летающего автомобиля",
        content: "Первый летающий автомобиль получает сертификацию FAA для коммерческого использования. Массовое производство запланировано на следующий год, поставки начнутся в крупных городах...",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=800&q=80"
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
    <div className="h-screen overflow-y-auto scrollbar-hide">
      <div className="px-4 py-6 space-y-8 pb-24">
        {currentArticles.map((article) => (
          <div key={article.id} className="space-y-3 relative">
            <div className="relative">
              <img 
                src={article.image} 
                alt=""
                className="w-full h-48 object-cover transition-transform duration-500 
                  hover:scale-[1.02] rounded-2xl"
                loading="lazy"
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
    </div>
  );
};