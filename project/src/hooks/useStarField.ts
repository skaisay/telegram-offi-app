import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StarFieldState {
  showStars: boolean;
  starDensity: number;
  starSpeed: number;
  performanceMode: boolean;
  setShowStars: (show: boolean) => void;
  setStarDensity: (density: number) => void;
  setStarSpeed: (speed: number) => void;
  setPerformanceMode: (enabled: boolean) => void;
}

export const useStarField = create<StarFieldState>()(
  persist(
    (set) => ({
      showStars: true,
      starDensity: 100,
      starSpeed: 100,
      performanceMode: false,
      setShowStars: (show) => set({ showStars: show }),
      setStarDensity: (density) => set({ starDensity: density }),
      setStarSpeed: (speed) => set({ starSpeed: speed }),
      setPerformanceMode: (enabled) => {
        set({ 
          performanceMode: enabled,
          starDensity: enabled ? 50 : 100,
          starSpeed: enabled ? 50 : 100
        });
      }
    }),
    {
      name: 'star-field-storage'
    }
  )
);