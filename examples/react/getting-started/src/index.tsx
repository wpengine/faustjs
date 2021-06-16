import { headlessConfig } from '@wpengine/headless-core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/global.css';

headlessConfig({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL || '',
  apiUrl: process.env.REACT_APP_API_URL,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
