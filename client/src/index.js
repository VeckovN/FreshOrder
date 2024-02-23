import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter} from 'react-router-dom'
import AuthProvider from './store/AuthProvider';
import NotificationProvider from './store/NotificationProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
          <App /> 
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


