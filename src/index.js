import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StatusContextProvider } from './contexts/StatusContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StatusContextProvider>
      <App />
    </StatusContextProvider>
  </React.StrictMode>
);