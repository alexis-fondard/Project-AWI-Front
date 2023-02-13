import React from 'react';
import Header from './Header';
import {
  BrowserRouter as Router,
  Routes, //Routes remplace Switch depuis la version 6 de React Router
  Route,
  Link
} from "react-router-dom";
import HomePage from "./HomePage";
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Ajoutez les routes pour les autres pages ici */}
      </Routes>
      </div>
      <Footer />
    </div>
  
  );
}

export default App;
