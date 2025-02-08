# Telegram App

A modern web application built with React, TypeScript, and Vite.

## Features

- Beautiful star field animation
- Multi-language support (EN, RU)
- Article management with favorites and offline storage
- Reading time tracking
- Statistics dashboard
- Toast notifications
- Responsive design

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/telegram-offi-app.git
cd telegram-offi-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To deploy manually:

1. Build the project:
```bash
npm run build
```

2. Push to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The GitHub Action will automatically build and deploy the app to GitHub Pages.

## Project Structure

```
src/
  ├── components/     # React components
  ├── hooks/         # Custom React hooks
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## License

MIT