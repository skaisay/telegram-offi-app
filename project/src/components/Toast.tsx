import React from 'react';
import { useToast } from '../hooks/useToast';
import { Check, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={`toast-${toast.id}`}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white
            ${toast.type === 'success' ? 'bg-white/10' : 'bg-red-500/10'}
            backdrop-blur-lg border border-white/10 shadow-lg
            animate-slide-in`}
        >
          {toast.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};