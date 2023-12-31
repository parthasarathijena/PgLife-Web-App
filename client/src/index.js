import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <AuthContextProvider>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </CookiesProvider>
);


