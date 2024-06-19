// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Buscador from './componentes/buscador';
import Personajes from './componentes/personajes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/navbar';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 


  

  <React.StrictMode>
    
    <Router>
  {/*  < Navbar /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/personajes/:id" element={<Personajes />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
