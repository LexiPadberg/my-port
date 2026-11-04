import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Could not find the element with id "root" in public/index.html, so the app cannot start.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
