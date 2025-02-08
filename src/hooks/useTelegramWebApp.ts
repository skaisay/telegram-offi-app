import { useCallback } from 'react';
import { useToast } from './useToast';

export const useTelegramWebApp = () => {
  const { addToast } = useToast();

  const initWebApp = useCallback(() => {
    try {
      const tg = window.Telegram?.WebApp;
      
      if (!tg) {
        console.warn('Telegram WebApp is not available');
        return;
      }

      // Initialize WebApp
      tg.ready();
      tg.expand();

      // Set theme colors
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');

      // Handle viewport and safe areas
      const root = document.documentElement;
      const updateSafeAreas = () => {
        const safeAreaTop = tg.viewportStableHeight < window.innerHeight 
          ? window.innerHeight - tg.viewportStableHeight 
          : 0;
        
        root.style.setProperty('--safe-area-top', `${safeAreaTop}px`);
        root.style.setProperty('--safe-area-bottom', '0px');
        root.style.setProperty('--viewport-height', `${tg.viewportStableHeight}px`);
      };

      // Initial update
      updateSafeAreas();

      // Listen for viewport changes
      tg.onEvent('viewportChanged', updateSafeAreas);

      // Disable native scrolling
      document.body.style.height = '100%';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Handle custom scrolling
      let touchStartY = 0;
      let activeScrollElement: Element | null = null;

      const findScrollableParent = (element: Element | null): Element | null => {
        while (element && element !== document.body) {
          const style = window.getComputedStyle(element);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            return element;
          }
          element = element.parentElement;
        }
        return document.querySelector('.scroll-container');
      };

      const handleTouchStart = (e: TouchEvent) => {
        const target = e.target as Element;
        activeScrollElement = findScrollableParent(target);
        if (activeScrollElement) {
          touchStartY = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!activeScrollElement) return;

        const touch = e.touches[0];
        const deltaY = touchStartY - touch.clientY;
        const { scrollTop, scrollHeight, clientHeight } = activeScrollElement;
        
        if (scrollTop <= 0 && deltaY < 0) {
          e.preventDefault();
          return;
        }
        
        if (scrollTop + clientHeight >= scrollHeight && deltaY > 0) {
          e.preventDefault();
          return;
        }
      };

      const handleTouchEnd = () => {
        touchStartY = 0;
        activeScrollElement = null;
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        tg.offEvent('viewportChanged', updateSafeAreas);
      };
    } catch (error) {
      console.error('Error initializing Telegram WebApp:', error);
      addToast('Ошибка инициализации приложения', 'error');
    }
  }, [addToast]);

  return { initWebApp };
};