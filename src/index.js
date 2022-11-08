import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContextProvider, { ContextData } from './context/ContextData';

AOS.init();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <App />

    </ContextProvider>

  </React.StrictMode>
);


