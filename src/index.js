// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import './styles/common.css' 

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Оборачиваем App в BrowserRouter */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
