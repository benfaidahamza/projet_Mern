import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
   <App />
  </BrowserRouter>
  );
