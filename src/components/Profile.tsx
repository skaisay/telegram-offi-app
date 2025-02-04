import React from 'react';

export const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
        alt="Profile"
        className="w-24 h-24 rounded-full mb-8 hover:scale-105 transition-transform duration-300"
      />
      <h2 className="text-2xl font-bold mb-6">
        John Doe
      </h2>
      <div className="space-y-3 text-center">
        <p className="text-gray-400 text-lg">
          +1 234 567 8900
        </p>
        <p className="text-gray-400 text-lg">
          192.168.1.1
        </p>
      </div>
    </div>
  );
};