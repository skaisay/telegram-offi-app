import React, { useEffect, useRef } from 'react';
import { useStarField } from '../hooks/useStarField';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  brightness: number;
}

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { starDensity, starSpeed, performanceMode } = useStarField();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Calculate number of stars based on density and performance mode
    const starCount = Math.floor(150 * (starDensity / 100)) * (performanceMode ? 0.5 : 1);

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * 2000,
      size: Math.random() * 1 + 0.5,
      speed: (Math.random() * 4 + 2) * (starSpeed / 100),
      brightness: Math.random() * 0.3 + 0.3
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.z -= star.speed;

        if (star.z <= 0) {
          star.z = 2000;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const perspective = 500 / star.z;
        const x = star.x * perspective + canvas.width / 2;
        const y = star.y * perspective + canvas.height / 2;

        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

        const size = star.size * perspective;
        const brightness = star.brightness * (1 - star.z / 2000);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        if (size > 1.2 && !performanceMode) {
          ctx.globalAlpha = 0.05;
          ctx.beginPath();
          ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [starDensity, starSpeed, performanceMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'black' }}
    />
  );
};