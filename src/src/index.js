import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';   
import i18n from './i18n.js'; 
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Toaster />
        <App />
    </AuthProvider>
);


