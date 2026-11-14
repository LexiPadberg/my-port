import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import siteConfig from './data/site_config';
import { loadPageViewCounter } from './utils/page_view_counter';

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

// Private page-view counter (only on the live site, and only once a code is set).
loadPageViewCounter(siteConfig.goatCounterCode);
