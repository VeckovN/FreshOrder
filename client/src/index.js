import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';




import { BrowserRouter} from 'react-router-dom'
import AuthProvider from './components/Store/AuthProvider';
import NotificationProvider from './components/Store/NotificationProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
          <App /> 
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
);

//PROBLEM WITH  Duplicate logs in console.log????
//React.StrictMode caused this
//https://dev.to/sebastianstamm/be-careful-with-console-log-when-using-react-strictmode-ah9
//https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


