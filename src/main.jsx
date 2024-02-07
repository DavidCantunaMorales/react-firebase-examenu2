import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { app } from './firebase/firebase.config.js';
app;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
import fbconfig from './firebase/firebase.config.js';
import { initializeApp } from 'firebase/app';
const app = initializeApp(fbconfig);
*/
