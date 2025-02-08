import React from 'react';

export const Main: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="space-y-8">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Telegram App</h2>
          <p className="text-lg text-gray-400">
            A modern web application built with React and Vite
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">Feature {item}</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};