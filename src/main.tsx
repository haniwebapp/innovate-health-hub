
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Script to handle dark mode before React renders to prevent flickering
const setInitialTheme = () => {
  const darkModeScript = document.createElement('script');
  darkModeScript.innerHTML = `
    (function() {
      // Check if theme is stored in localStorage
      const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.add(theme);
    })()
  `;
  darkModeScript.setAttribute('type', 'text/javascript');
  document.head.prepend(darkModeScript);
};

setInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
