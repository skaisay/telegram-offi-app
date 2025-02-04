import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 ${className}`}>
      {children}
    </div>
  );
};