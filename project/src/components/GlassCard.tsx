import React, { forwardRef } from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'article' | 'settings' | 'menu';
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({ 
  children, 
  className = '',
  variant = 'article',
  ...props
}, ref) => {
  const baseStyles = "rounded-2xl";
  
  const variantStyles = {
    article: "bg-black/5 backdrop-blur-[2px] border border-white/[0.02]",
    settings: "bg-black/30 backdrop-blur-md border border-white/10",
    menu: "bg-black/25 backdrop-blur-md border border-white/10"
  };

  return (
    <div 
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});