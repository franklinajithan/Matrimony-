import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserProvider } from './context/UserContext';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Ensure your HTML has a <div id='root'></div>.");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
