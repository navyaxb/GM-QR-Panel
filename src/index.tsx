import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './values/global.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Add this to your main App.js or index.js
if (process.env.NODE_ENV === 'development') {
  const consoleError = console.error;
  console.error = (...args) => {
      if (
          typeof args[0] === 'string' &&
          args[0].includes('ResizeObserver loop completed with undelivered notifications.')
      ) {
          return;
      }
      consoleError(...args);
  };
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ-OEO6fTRBjFjegCUdMN2pE9exJiyrYY",
  authDomain: "gm-qr-panel.firebaseapp.com",
  projectId: "gm-qr-panel",
  storageBucket: "gm-qr-panel.appspot.com",
  messagingSenderId: "742699012603",
  appId: "1:742699012603:web:0ddd968b741690cb767b5e",
  measurementId: "G-QPSPXDXK1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);
